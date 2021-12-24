const express = require("express");

const app = express();
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
app.use(cors());
const path = require("path");
const port = 3000;
const apiRoute = require("./routes/api");
const allRoute = require("./routes/all");
app.use("/api", apiRoute);
app.use("/all", allRoute);

var infobj = {
  Author: "PrabinSubedi",
  github_repo: "https://github.com/prabincodes/rashifal-api",
  ip_address: "working on it",
};

app.get("/", (request, response) => {
  response.sendFile(path.resolve("views", "index.html"));
});
app.get("/info", (request, response) => {
  response.send(infobj);
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express serve r listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
