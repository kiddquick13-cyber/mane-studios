/*
  MANE STUDIOS — catalog
  ----------------------
  This is the only file you need to edit to add shows, movies and episodes.

  Your video storage (Cloudflare R2, bucket "manestudiosvideos"):
    https://pub-aaebe547980947bf937593585efd745f.r2.dev/
  Upload a file there, then use that address + the file name as the link.

  For any movie or episode, "video" is where the file lives:
    - a link to an .mp4 file, e.g. "https://videos.example.com/tosl-s2e1.mp4"
    - or a YouTube video, written as "youtube:VIDEO_ID"
    - or "" (empty) — it shows as "Coming soon" until you add a link.

  "tone" is the color of the type poster used when there is no poster image.
  Ratings: "TV-MA" titles ask viewers to confirm they're 18+ before playing.
*/

window.CATALOG = {
  featured: "the-other-side-of-love",

  rows: [
    { name: "Series", ids: ["the-other-side-of-love", "aint-no-way", "storm-crown", "saphire", "three-oh-seven"] },
    { name: "Movies and short films", ids: ["blood-money", "the-second-phone", "mane-last-run", "you-never-know", "when-love-finds-its-way-back", "the-rolling-fist"] },
    { name: "Hometown Legends", ids: ["big-snow-73", "white-christmas-89", "hurricane-matthew", "the-crackdown", "escape-330", "dizzy", "hazel-1954", "the-part-before-the-shots"] },
    { name: "True stories", ids: ["lake-city-to-the-stars", "august-7-1970"] },
    { name: "Kids", ids: ["milo-and-lily"] }
  ],

  titles: {

    /* ───────────── SERIES ───────────── */

    "the-other-side-of-love": {
      name: "The Other Side of Love",
      kind: "series",
      rating: "TV-MA",
      year: 2026,
      genre: "Drama",
      logline: "Two sisters. One man. Neither one knew about the other.",
      about: "Maya is an ER nurse. Her little sister Nia dances at the club. Both of them were seeing Wayne, and neither knew. Now Maya has moved on with Mane, Nia has a baby on the way, and everybody at the club knows something Maya doesn't.",
      tone: "#7a1c2b",
      poster: "media/tosl-poster.jpg",
      backdrop: "media/tosl-backdrop.jpg",
      seasons: [
        {
          name: "Season 1",
          episodes: [
            { title: "Episode 1", length: "5:04", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e01.mp4" },
            { title: "Episode 2", length: "4:53", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e02.mp4" },
            { title: "Episode 3", length: "5:05", about: "Wayne figures it out.", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e03.mp4" },
            { title: "Episode 4", length: "5:33", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e04.mp4" },
            { title: "Episode 5", length: "4:55", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e05.mp4" },
            { title: "Episode 6", length: "6:08", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e06.mp4" },
            { title: "Episode 7", length: "2:08", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e07.mp4" },
            { title: "Episode 8", length: "3:32", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e08.mp4" },
            { title: "Episode 9", length: "3:37", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e09.mp4" },
            { title: "Episode 10", length: "5:15", about: "Season finale. Nia shows up on Maya's porch.", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e10.mp4" }
          ]
        },
        {
          name: "Season 2",
          episodes: [
            { title: "The Morning After", length: "2:56", about: "Nia finds out who Maya's been seeing, and Maya hears a name she doesn't know: Tiff.", video: "" },
            { title: "Handoff", about: "Tiff wants to talk about Mane.", video: "" }
          ]
        }
      ]
    },

    "aint-no-way": {
      name: "Ain't No Way!",
      kind: "series",
      rating: "TV-MA",
      year: 2026,
      genre: "Adult animated comedy",
      logline: "Mane, Shirley, Big Reggie and Miss Pearl. Two minutes of trouble at a time.",
      about: "Grown-folks cartoon comedy. Every skit is a situation you've been in, and somebody always takes it too far.",
      tone: "#c8661b",
      seasons: [
        {
          name: "Skits",
          episodes: [
            { title: "The Anniversary", length: "2:00", about: "Mane forgot. Reggie's gift doesn't help.", video: "" }
          ]
        }
      ]
    },

    "storm-crown": {
      name: "Storm Crown",
      kind: "series",
      rating: "TV-14",
      year: 2026,
      genre: "Anime",
      logline: "Blue lightning. Pink lightning. One crown.",
      about: "Mane and Shirley fight their way through a new enemy every episode.",
      tone: "#1d3f8f",
      seasons: [
        { name: "Season 1", episodes: [
          { title: "Episode 1", video: "" },
          { title: "Episode 2", video: "" },
          { title: "Episode 3", video: "" }
        ] }
      ]
    },

    "saphire": {
      name: "Saphire",
      kind: "series",
      rating: "TV-14",
      year: 2026,
      genre: "Fantasy",
      logline: "Antwain Quick, Elara, and the sorcerer Maleficus.",
      about: "A fantasy saga that starts in a tavern and doesn't stay there.",
      tone: "#1f6b78",
      seasons: [
        { name: "Season 1", episodes: [
          { title: "Episode 1", video: "" },
          { title: "Episode 2", video: "" }
        ] }
      ]
    },

    "three-oh-seven": {
      name: "3:07 A.M.",
      kind: "series",
      rating: "TV-MA",
      year: 2026,
      genre: "Horror",
      logline: "Same time every night.",
      about: "A supernatural psychological horror series in three-minute episodes.",
      tone: "#3b3f47",
      seasons: [
        { name: "Season 1", episodes: [ { title: "Episode 1", video: "" } ] }
      ]
    },

    /* ───────────── MOVIES & SHORT FILMS ───────────── */

    "blood-money": {
      name: "Blood Money",
      kind: "movie",
      rating: "TV-MA",
      year: 2026,
      genre: "Crime",
      logline: "Marcus runs the streets. Elena runs his heart.",
      about: "A ruthless dealer falls in love, and the game doesn't care.",
      tone: "#8a1414",
      video: ""
    },

    "the-second-phone": {
      name: "The Second Phone",
      kind: "movie",
      rating: "TV-MA",
      year: 2026,
      genre: "Drama",
      logline: "Wayne had two phones. Somebody found the other one.",
      about: "An anniversary cruise, a car crash, and a vow renewal where everything comes out.",
      tone: "#5b2a86",
      video: ""
    },

    "mane-last-run": {
      name: "Mane: Last Run",
      kind: "movie",
      rating: "TV-MA",
      year: 2026,
      genre: "Film",
      logline: "The first MANE STUDIOS film.",
      about: "Where it all started.",
      tone: "#a8781e",
      video: ""
    },

    "you-never-know": {
      name: "You Never Know What Can Happen",
      kind: "movie",
      rating: "TV-MA",
      year: 2026,
      genre: "Survival horror",
      logline: "Westbridge, Georgia. After.",
      about: "Tonya, Marcus, Darius and Sierra try to make it through a town that isn't theirs anymore.",
      tone: "#4d5a2a",
      video: ""
    },

    "when-love-finds-its-way-back": {
      name: "When Love Finds Its Way Back",
      kind: "movie",
      rating: "TV-PG",
      year: 2026,
      genre: "Romance",
      logline: "One fundraiser weekend. One marriage worth saving.",
      about: "Mane and Shirley run the community center fundraiser and find their way back to each other.",
      tone: "#b0485c",
      video: ""
    },

    "the-rolling-fist": {
      name: "The Rolling Fist",
      kind: "movie",
      rating: "TV-PG",
      year: 2026,
      genre: "Animated comedy",
      logline: "Kung fu, but make it animals.",
      about: "An animated kung fu comedy.",
      tone: "#2f7d4a",
      video: ""
    },

    /* ───────────── HOMETOWN LEGENDS (Bennettsville & the Pee Dee) ───────────── */

    "big-snow-73":        { name: "The Big Snow of '73",       kind: "movie", rating: "TV-G",  genre: "History", length: "2:00", logline: "The week the Pee Dee disappeared under snow.", tone: "#5f7f9a", video: "" },
    "white-christmas-89": { name: "White Christmas, 1989",     kind: "movie", rating: "TV-G",  genre: "History", length: "2:00", logline: "The Christmas it snowed in South Carolina.", tone: "#3f6c8e", video: "" },
    "hurricane-matthew":  { name: "Hurricane Matthew, 2016",   kind: "movie", rating: "TV-PG", genre: "History", length: "2:00", logline: "The rain that wouldn't stop.", tone: "#40566b", video: "" },
    "hazel-1954":         { name: "Hazel, 1954",               kind: "movie", rating: "TV-PG", genre: "History", length: "2:00", logline: "The storm the old folks still talk about.", tone: "#56606b", video: "" },
    "the-crackdown":      { name: "The Crackdown",             kind: "movie", rating: "TV-14", genre: "True crime", length: "2:00", logline: "When the raids came to Marlboro County.", tone: "#6b2f2f", video: "" },
    "escape-330":         { name: "Escape at 3:30 A.M.",       kind: "movie", rating: "TV-14", genre: "True crime", length: "2:00", logline: "A jail break, and the hunt that followed.", tone: "#2f3b4f", video: "" },
    "dizzy":              { name: "Dizzy",                     kind: "movie", rating: "TV-G",  genre: "History", length: "2:00", logline: "Cheraw gave the world a horn player.", tone: "#8a6a1e", video: "" },
    "the-part-before-the-shots": { name: "The Part Before the Shots", kind: "movie", rating: "TV-MA", genre: "Documentary", logline: "What nobody talks about until it's too late.", tone: "#4a3a33", video: "" },

    /* ───────────── TRUE STORIES ───────────── */

    "lake-city-to-the-stars": { name: "From Lake City to the Stars", kind: "movie", rating: "TV-G",  genre: "Documentary", length: "2:00", logline: "Ronald McNair: from a library counter in 1959 to space.", tone: "#24406b", video: "" },
    "august-7-1970":          { name: "August 7, 1970",              kind: "movie", rating: "TV-14", genre: "Documentary", length: "1:20", logline: "The Marin County courthouse takeover, and the manhunt for Angela Davis that followed.", tone: "#5a4a2a", video: "" },

    /* ───────────── KIDS ───────────── */

    "milo-and-lily": {
      name: "Milo & Lily",
      kind: "series",
      rating: "TV-Y",
      year: 2026,
      genre: "Kids",
      logline: "Milo, Lily, Mom, and Tidy the robot.",
      about: "Five-minute stories about doing the right thing.",
      tone: "#e0a21b",
      seasons: [
        { name: "Season 1", episodes: [ { title: "Clean Up Your Mess", about: "Tidy can't clean up everything by himself.", video: "" } ] }
      ]
    }
  }
};
