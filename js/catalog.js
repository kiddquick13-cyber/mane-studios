/*
  MANE STUDIOS — catalog
  ----------------------
  This is the only file you need to edit to add shows, seasons and episodes.

  Your video storage (Cloudflare R2, bucket "manestudiosvideos"):
    https://pub-aaebe547980947bf937593585efd745f.r2.dev/
  Upload a file there, then use that address + the file name as the link.

  For any episode, "video" is where the file lives:
    - a link to an .mp4 file in your storage (above)
    - or a YouTube video, written as "youtube:VIDEO_ID"

  To add a new season, copy the whole Season 1 block (from { name: "Season 1"
  down to its closing }), paste it after it with a comma between them, change
  the name to "Season 2", and put in the new episodes and links.

  Ratings: "TV-MA" titles ask viewers to confirm they're 18+ before playing.
*/

window.CATALOG = {
  featured: "the-other-side-of-love",

  rows: [
    { name: "Series", ids: ["the-other-side-of-love"] }
  ],

  titles: {

    "the-other-side-of-love": {
      name: "The Other Side of Love",
      kind: "series",
      rating: "TV-MA",
      year: 2026,
      genre: "Drama",
      logline: "Two sisters. One man. Neither one knew about the other.",
      about: "Maya is an ER nurse. Her little sister Nia dances at the club. Both of them are seeing the same man, Wayne, and neither one knows it.",
      tone: "#7a1c2b",
      poster: "media/tosl-poster.jpg",
      backdrop: "media/tosl-backdrop.jpg",
      seasons: [
        {
          name: "Season 1",
          episodes: [
            { title: "Episode 1", length: "5:04", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e01.mp4" },
            { title: "Episode 2", length: "4:53", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e02.mp4" },
            { title: "Episode 3", length: "5:05", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e03.mp4" },
            { title: "Episode 4", length: "5:33", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e04.mp4" },
            { title: "Episode 5", length: "4:55", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e05.mp4" },
            { title: "Episode 6", length: "6:08", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e06.mp4" },
            { title: "Episode 7", length: "2:08", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e07.mp4" },
            { title: "Episode 8", length: "3:32", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e08.mp4" },
            { title: "Episode 9", length: "3:37", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e09.mp4" },
            { title: "Episode 10", length: "5:15", about: "Season finale.", video: "https://pub-aaebe547980947bf937593585efd745f.r2.dev/tosl-s1e10.mp4" }
          ]
        }
      ]
    }

  }
};
