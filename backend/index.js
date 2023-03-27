const express = require("express");
const fs = require("fs");

const app = express();

const videoList = {
  vid1: "./videos/vid1.mp4",
  vid2: "./videos/vid2.mp4",
  vid3: "./videos/vid3.mp4",
};

app.get("/videos/:filename", (req, resp) => {
  const fileName = req.params.filename;
  const filePath = videoList[fileName];

  if (!filePath) {
    return resp.status(404).send("File not found");
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start} - ${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    resp.writeHead(206, head);
    file.pipe(resp);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    resp.writeHead(200, head);
    fs.createReadStream(filePath).pipe(resp);
  }
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
