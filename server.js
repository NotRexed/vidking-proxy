// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow cross-origin requests from your frontend
app.use(cors());
app.use(express.json());

// Serve your static frontend files
app.use(express.static(path.join(__dirname, "public"))); 
// Put your HTML, script.js, style.css, etc inside a "public" folder

// API endpoint to build embed URLs
app.post("/api/build-url", (req, res) => {
  const { type, showId, season, episode } = req.body;

  if (!showId) {
    return res.status(400).json({ error: "Missing showId" });
  }

  let url = "";
  if (type === "movie") {
    url = `https://www.vidking.net/embed/movie/${showId}`;
  } else if (type === "tv") {
    if (!season || !episode) {
      return res.status(400).json({ error: "Missing season or episode" });
    }
    url = `https://www.vidking.net/embed/tv/${showId}/${season}/${episode}`;
  } else {
    return res.status(400).json({ error: "Invalid type" });
  }

  res.json({ url });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
