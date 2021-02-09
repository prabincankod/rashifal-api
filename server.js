const express = require("express");

const app = express();
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
app.use(cors());
const path = require("path");
const port = 3000;
var infobj = {
  Author: "PrabinSubedi",
  github_repo: "https://github.com/prabincodes/rashifal-api",
  ip_address: "working on it"
};

app.get("/", (request, response) => {
  response.sendFile(path.resolve("views", "index.html"));
});
app.get("/info", (request, response) => {
  response.send(infobj);
});

app.get("/api/:sign", (req, resp) => {
  var n;
  var e = req.params.sign;

  switch (e) {
    case "aries":
      n = "mesh";
      break;
    case "taurus":
      n = "brish";
      break;
    case "gemini":
      n = "mithun";
      break;
    case "cancer":
      n = "karkat";
      break;
    case "leo":
      n = "singha";
      break;
    case "virgo":
      n = "kanya";
      break;
    case "libra":
      n = "tula";
      break;
    case "scorpio":
      n = "brischik";
      break;
    case "sagittarius":
      n = "dhanu";
      break;
    case "capricorn":
      n = "makar";
    case "aquarius":
      n = "kumbha";
      break;
    case "pisces":
      n = "meen";
      break;
  }

  if ((e = n)) {
    const url = "https://www.hamropatro.com/rashifal/daily/" + n;
    console.log(url);
    axios.get(url).then(res => {
      const $ = cheerio.load(res.data);
      const desc = $(".desc")
        .find("p")
        .text();
const date = $(".articleTitleNew")
        .find("span")
        .text();
      const dt = date.split(" ", 4);

      const sc = desc.replace("\n", "");
      const obj = {
        date: dt[2] + " " + dt[1] + " " + dt[0] + " " + dt[3],
        sun_sign: n,
        prediction: sc
      };
      resp.send(obj);
    });
  } else {
    const failobj = {
      message: req.params.sign + " is not meant to be a sunign"
    };

    resp.send(failobj);
  }
});
app.listen(process.env.PORT || 3000, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
