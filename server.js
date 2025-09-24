const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/api/build-url", (req, res) => {
  const { type, showId, season, episode } = req.body;
  if (!showId) return res.json({ error: "Missing showId" });

  let url = "";
  if (type === "movie") url = `https://www.vidking.net/embed/movie/${showId}`;
  else if (type === "tv") url = `https://www.vidking.net/embed/tv/${showId}/${season}/${episode}`;

  res.json({ url });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
