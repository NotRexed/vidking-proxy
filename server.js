import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware so we can parse JSON requests
app.use(express.json());

// === ADD THIS PART ===
// API endpoint that builds the embed URL
app.post("/api/build-url", (req, res) => {
  const { type, showId, season, episode } = req.body;

  if (!showId) {
    return res.json({ error: "Missing showId" });
  }

  let url = "";
  if (type === "movie") {
    url = `https://www.vidking.net/embed/movie/${showId}`;
  } else if (type === "tv") {
    if (!season || !episode) {
      return res.json({ error: "Missing season or episode for TV show" });
    }
    url = `https://www.vidking.net/embed/tv/${showId}/${season}/${episode}`;
  } else {
    return res.json({ error: "Invalid type" });
  }

  res.json({ url });
});
// === END OF NEW PART ===

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
