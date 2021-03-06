const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/dist/todo"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/todo/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/todo/index.html"));
});

app.get("/main", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/todo/index.html"));
});

app.listen(process.env.PORT || 8080);
