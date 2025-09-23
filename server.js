import express from "express";

const app = express();
const PORT = 3000;

// Proxy endpoint: takes movie ID
app.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const iframeHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VidKing Embed</title>
      <style>
        html, body { margin: 0; height: 100%; }
        iframe { width: 100%; height: 100%; border: 0; }
      </style>
    </head>
    <body>
      <iframe src="https://www.vidking.net/embed/movie/${movieId}" allowfullscreen></iframe>
    </body>
    </html>
  `;
  res.send(iframeHTML);
});

app.listen(PORT, () => console.log(`Proxy running at http://localhost:${PORT}`));
