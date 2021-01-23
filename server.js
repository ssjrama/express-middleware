const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log("Request Date : " + new Date());
  next();
});

app.use((req, res, next) => {
  var filepath = path.join(__dirname, "static", req.url);
  fs.stat(filepath, (err, fileinfo) => {
    if (err) {
      next();
      return;
    }
    if (fileinfo.isFile()) {
      res.sendFile(filepath);
    } else {
      next();
    }
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("File Not Found");
});

// server
app.listen(PORT, () => {
  console.log(`Application running on http://localhost:${PORT}`);
});
