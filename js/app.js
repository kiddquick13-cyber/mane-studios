/* MANE STUDIOS — site logic. You shouldn't need to edit this file; add titles in catalog.js. */
(function () {
  "use strict";

  const C = window.CATALOG;
  const T = C.titles;
  const $ = (s, r = document) => r.querySelector(s);

  /* ── tiny helpers ─────────────────────── */
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else if (k === "style") n.setAttribute("style", v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const k of kids.flat()) if (k != null && k !== false) n.append(k.nodeType ? k : document.createTextNode(k));
    return n;
  }
  const svg = (path, extra = "") => {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = path + extra; return s;
  };
  const ICON_PLAY = '<path d="M7 4.5v15l13-7.5z"/>';
  const ICON_INFO = '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>';
  const ICON_X = '<path d="M6 6l12 12M18 6 6 18"/>';
  const ICON_L = '<path d="M15 5l-7 7 7 7"/>';
  const ICON_R = '<path d="M9 5l7 7-7 7"/>';

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: keep going */ } }
  };

  /* ── catalog helpers ──────────────────── */
  const isSeries = t => t.kind === "series";
  const epAt = (t, s, e) => isSeries(t) ? (t.seasons[s] && t.seasons[s].episodes[e]) : null;
  const srcOf = (t, s, e) => isSeries(t) ? (epAt(t, s, e) || {}).video : t.video;
  const firstPlayable = t => {
    if (!isSeries(t)) return t.video ? { s: 0, e: 0 } : null;
    for (let s = 0; s < t.seasons.length; s++)
      for (let e = 0; e < t.seasons[s].episodes.length; e++)
        if (t.seasons[s].episodes[e].video) return { s, e };
    return null;
  };
  const nextOf = (t, s, e) => {
    if (!isSeries(t)) return null;
    let ns = s, ne = e + 1;
    if (ne >= t.seasons[ns].episodes.length) { ns++; ne = 0; }
    const ep = epAt(t, ns, ne);
    return ep && ep.video ? { s: ns, e: ne } : null;
  };
  const keyOf = (id, s, e) => `${id}|${s}|${e}`;
  const progress = () => store.get("mane.progress", {});
  const resumeFor = id => {
    const p = progress(); let best = null;
    for (const [k, v] of Object.entries(p)) if (v.id === id && (!best || v.at > best.at)) best = v;
    return best;
  };
  const epLabel = (s, e) => `S${s + 1} E${e + 1}`;

  /* ── posters ──────────────────────────── */
  function posterArt(id, { wide = false } = {}) {
    const t = T[id];
    const img = wide ? t.backdrop : t.poster;
    if (img) return el("img", { src: img, alt: "", loading: "lazy" });
    const p = el("div", { class: "typeposter", style: `--tone:${t.tone || "#5a2a22"}` },
      el("p", { class: "tp-title" + (t.name.length > 18 ? " long" : ""), text: t.name }),
      el("p", { class: "tp-studio", text: "MANE STUDIOS" }));
    return p;
  }

  function card(id) {
    const t = T[id];
    const playable = !!firstPlayable(t);
    return el("button", { class: "card", type: "button", "aria-label": `${t.name}${playable ? "" : ", coming soon"}`, onclick: () => openSheet(id) },
      el("div", { class: "card-art" + (!playable || t.rating === "TV-MA" ? " has-tag" : "") },
        posterArt(id),
        !playable && el("span", { class: "card-tag soon", text: "Coming soon" }),
        playable && t.rating === "TV-MA" && el("span", { class: "card-tag", text: "TV-MA" })),
      el("span", { class: "card-label", text: t.name }));
  }

  function cwCard(v) {
    const t = T[v.id]; if (!t) return null;
    const pct = Math.max(2, Math.min(100, Math.round((v.t / (v.d || 1)) * 100)));
    const sub = isSeries(t) ? epLabel(v.s, v.e) : "Movie";
    return el("button", { class: "card cw", type: "button", "aria-label": `Resume ${t.name} ${sub}`, onclick: () => play(v.id, v.s, v.e) },
      el("div", { class: "card-art" }, posterArt(v.id, { wide: true }), el("div", { class: "cw-bar" }, el("span", { style: `width:${pct}%` }))),
      el("span", { class: "card-label", text: `${t.name}, ${sub}` }));
  }

  /* ── header & nav ─────────────────────── */
  function renderNav() {
    const nav = $("#nav");
    nav.append(el("a", { href: "#top", text: "Home" }));
    C.rows.forEach((r, i) => nav.append(el("a", { href: `#row-${i}`, text: r.name })));
    const top = $("#top");
    const onScroll = () => top.classList.toggle("solid", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ── hero ─────────────────────────────── */
  function renderHero() {
    const id = C.featured, t = T[id], hero = $("#hero");
    hero.innerHTML = "";
    if (t.backdrop) hero.append(el("img", { class: "hero-img", src: t.backdrop, alt: "" }));
    const fp = firstPlayable(t), r = resumeFor(id);
    const latest = isSeries(t) ? `${t.seasons.length > 1 ? t.seasons[t.seasons.length - 1].name + " is here" : ""}` : "";
    hero.append(el("div", { class: "hero-copy" },
      el("h1", { class: "hero-title", text: t.name }),
      el("div", { class: "hero-meta" }, ratingBadge(t.rating), t.genre && el("span", { text: t.genre }), latest && el("span", { text: latest })),
      el("p", { class: "hero-line", text: t.logline }),
      el("div", { class: "hero-actions" },
        el("button", { class: "btn btn-gold", type: "button", disabled: !fp, onclick: () => r ? play(id, r.s, r.e) : fp && play(id, fp.s, fp.e) },
          svg(ICON_PLAY), r ? `Resume ${isSeries(t) ? epLabel(r.s, r.e) : ""}`.trim() : fp ? "Play" : "Coming soon"),
        el("button", { class: "btn btn-ghost", type: "button", onclick: () => openSheet(id) }, svg(ICON_INFO), "Episodes and info"))));
  }

  const ratingBadge = r => r ? el("span", { class: "rating-badge" + (r === "TV-MA" ? " rating-ma" : ""), text: r }) : null;

  /* ── rows ─────────────────────────────── */
  function row(name, cards, i, wide) {
    const track = el("div", { class: "track" + (wide ? " wide" : "") }, cards);
    const scrollBy = dir => track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
    return el("section", { class: "row", id: i != null ? `row-${i}` : null, "aria-label": name },
      el("h2", { class: "row-name", text: name }),
      el("button", { class: "row-arrow prev", type: "button", "aria-label": `Scroll ${name} left`, onclick: () => scrollBy(-1) }, svg(ICON_L)),
      track,
      el("button", { class: "row-arrow next", type: "button", "aria-label": `Scroll ${name} right`, onclick: () => scrollBy(1) }, svg(ICON_R)));
  }

  function renderRows() {
    const rows = $("#rows"); rows.innerHTML = "";
    const cw = Object.values(progress()).filter(v => T[v.id]).sort((a, b) => b.at - a.at);
    if (cw.length) rows.append(row("Continue watching", cw.map(cwCard), null, true));
    C.rows.forEach((r, i) => rows.append(row(r.name, r.ids.filter(id => T[id]).map(card), i)));
  }

  /* ── title sheet ──────────────────────── */
  const sheet = $("#sheet");
  let sheetSeason = 0;

  function openSheet(id, season) {
    const t = T[id];
    const r = resumeFor(id);
    sheetSeason = season != null ? season : (r ? r.s : (isSeries(t) ? Math.max(0, t.seasons.findIndex(x => x.episodes.some(e => e.video))) : 0));
    sheet.innerHTML = "";
    sheet.dataset.id = id;
    const fp = firstPlayable(t);

    const meta = el("div", { class: "sheet-meta" },
      ratingBadge(t.rating), t.year && el("span", { text: String(t.year) }), t.genre && el("span", { text: t.genre }),
      isSeries(t) ? el("span", { text: `${t.seasons.length} ${t.seasons.length === 1 ? "season" : "seasons"}` }) : t.length && el("span", { text: t.length }));

    const playBtn = el("button", { class: "btn btn-gold", type: "button", disabled: !fp,
      onclick: () => r ? play(id, r.s, r.e) : fp && play(id, fp.s, fp.e) },
      svg(ICON_PLAY), r ? `Resume ${isSeries(t) ? epLabel(r.s, r.e) : ""}`.trim() : fp ? (isSeries(t) ? `Play ${epLabel(fp.s, fp.e)}` : "Play") : "Coming soon");

    sheet.append(
      el("button", { class: "sheet-close", type: "button", "aria-label": "Close", onclick: () => sheet.close() }, svg(ICON_X)),
      el("div", { class: "sheet-top" }, posterArt(id, { wide: true }), el("h2", { class: "sheet-title", id: "sheet-title", text: t.name })),
      el("div", { class: "sheet-body" },
        meta,
        t.logline && el("p", { class: "sheet-line", text: t.logline }),
        t.about && el("p", { class: "sheet-about", text: t.about }),
        el("div", { class: "sheet-actions" }, playBtn),
        isSeries(t) && episodesBlock(id)));

    if (!sheet.open) sheet.showModal();
    sheet.scrollTop = 0;
  }

  function episodesBlock(id) {
    const t = T[id];
    const wrap = el("div", { class: "eps-wrap" });
    const draw = () => {
      wrap.innerHTML = "";
      if (t.seasons.length > 1) {
        wrap.append(el("div", { class: "seasons", role: "group", "aria-label": "Seasons" },
          t.seasons.map((s, i) => el("button", { class: "season-btn", type: "button", "aria-pressed": String(i === sheetSeason),
            onclick: () => { sheetSeason = i; draw(); } }, s.name))));
      } else {
        wrap.append(el("div", { class: "seasons" }, el("span", { class: "season-btn", "aria-pressed": "true" }, t.seasons[0].name)));
      }
      const p = progress();
      const list = el("ul", { class: "episodes" });
      t.seasons[sheetSeason].episodes.forEach((ep, e) => {
        const has = !!ep.video;
        const pr = p[keyOf(id, sheetSeason, e)];
        list.append(el("li", null, el("button", { class: "ep", type: "button", disabled: !has,
          "aria-label": `Episode ${e + 1}, ${ep.title}${has ? "" : ", coming soon"}`,
          onclick: () => play(id, sheetSeason, e) },
          el("span", { class: "ep-num", text: String(e + 1) }),
          el("span", { class: "ep-title", text: ep.title }),
          el("span", { class: "ep-side" + (has ? "" : " soon"), text: has ? (ep.length || "") : "Coming soon" }),
          ep.about && el("span", { class: "ep-about", text: ep.about }),
          pr && el("span", { class: "ep-progress" }, el("span", { style: `width:${Math.round(pr.t / (pr.d || 1) * 100)}%` })))));
      });
      wrap.append(list);
    };
    draw();
    return wrap;
  }

  /* ── 18+ gate ─────────────────────────── */
  const gate = $("#gate");
  function needsGate(t) { return t.rating === "TV-MA" && store.get("mane.age18", false) !== true; }
  function askAge(t) {
    return new Promise(resolve => {
      $("#gate-title").textContent = `${t.name} is for adults 18 and older`;
      gate.returnValue = "";
      gate.addEventListener("close", () => {
        const ok = gate.returnValue === "yes";
        if (ok) store.set("mane.age18", true);
        resolve(ok);
      }, { once: true });
      gate.showModal();
    });
  }

  /* ── player ───────────────────────────── */
  const player = $("#player"), stage = $("#player-stage"), nextBox = $("#player-next");
  let current = null, idleTimer = 0, lastSave = 0;

  async function play(id, s, e) {
    const t = T[id];
    if (!srcOf(t, s, e)) return;
    if (needsGate(t) && !(await askAge(t))) return;
    if (sheet.open) sheet.close();
    current = { id, s, e };
    const ep = epAt(t, s, e);
    $("#player-title").textContent = isSeries(t) ? `${t.name}, ${epLabel(s, e)}: ${ep.title}` : t.name;
    nextBox.hidden = true;
    stage.innerHTML = "";

    const src = srcOf(t, s, e);
    if (src.startsWith("youtube:")) {
      const vid = encodeURIComponent(src.slice(8).trim());
      stage.append(el("iframe", { src: `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&playsinline=1`,
        title: $("#player-title").textContent, allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: true }));
    } else {
      const v = el("video", { src, controls: true, autoplay: true, playsinline: true, preload: "auto" });
      const saved = progress()[keyOf(id, s, e)];
      v.addEventListener("loadedmetadata", () => { if (saved && saved.t < v.duration - 15) v.currentTime = saved.t; }, { once: true });
      v.addEventListener("timeupdate", () => {
        const now = Date.now();
        if (now - lastSave < 4000) return;
        lastSave = now; saveProgress(v);
      });
      v.addEventListener("pause", () => saveProgress(v));
      v.addEventListener("ended", () => { clearProgress(); showNext(); });
      stage.append(v);
      v.play().catch(() => { /* autoplay blocked: viewer presses play */ });
    }
    player.hidden = false;
    document.body.style.overflow = "hidden";
    poke();
    $("#player-back").focus();
  }

  function saveProgress(v) {
    if (!current || !v.duration || !isFinite(v.duration)) return;
    const p = progress(), k = keyOf(current.id, current.s, current.e);
    if (v.currentTime < 5) return;
    if (v.currentTime > v.duration - 15) delete p[k];
    else p[k] = { id: current.id, s: current.s, e: current.e, t: Math.floor(v.currentTime), d: Math.floor(v.duration), at: Date.now() };
    store.set("mane.progress", p);
  }
  function clearProgress() {
    if (!current) return;
    const p = progress(); delete p[keyOf(current.id, current.s, current.e)]; store.set("mane.progress", p);
  }

  function showNext() {
    const t = T[current.id], n = nextOf(t, current.s, current.e);
    if (!n) return;
    $("#player-next-title").textContent = `${epLabel(n.s, n.e)}: ${epAt(t, n.s, n.e).title}`;
    nextBox.hidden = false;
    $("#player-next-btn").onclick = () => play(current.id, n.s, n.e);
    $("#player-next-btn").focus();
  }

  function closePlayer() {
    const v = stage.querySelector("video");
    if (v) { saveProgress(v); v.pause(); v.removeAttribute("src"); v.load(); }
    stage.innerHTML = "";
    player.hidden = true;
    document.body.style.overflow = "";
    const back = current; current = null;
    renderHero(); renderRows();
    if (back && isSeries(T[back.id])) openSheet(back.id, back.s);
  }

  function poke() {
    player.classList.remove("idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => player.classList.add("idle"), 2800);
  }
  ["mousemove", "touchstart", "keydown"].forEach(ev => player.addEventListener(ev, poke, { passive: true }));
  $("#player-back").addEventListener("click", closePlayer);
  document.addEventListener("keydown", ev => { if (ev.key === "Escape" && !player.hidden) closePlayer(); });

  /* ── search ───────────────────────────── */
  const results = $("#results"), hero = $("#hero"), rowsBox = $("#rows");
  $("#search").addEventListener("input", ev => {
    const q = ev.target.value.trim().toLowerCase();
    if (!q) { results.hidden = true; hero.hidden = false; rowsBox.hidden = false; return; }
    const hits = Object.keys(T).filter(id => {
      const t = T[id];
      return [t.name, t.genre, t.logline, t.about].some(x => x && x.toLowerCase().includes(q));
    });
    results.innerHTML = "";
    results.append(el("h2", { text: hits.length ? `Results for "${ev.target.value.trim()}"` : `Nothing matches "${ev.target.value.trim()}"` }));
    if (hits.length) results.append(el("div", { class: "results-grid" }, hits.map(card)));
    else results.append(el("p", { class: "results-empty", text: "Try a show name, like The Other Side of Love." }));
    results.hidden = false; hero.hidden = true; rowsBox.hidden = true;
  });

  /* ── go ───────────────────────────────── */
  $("#year").textContent = new Date().getFullYear();
  renderNav(); renderHero(); renderRows();
})();
