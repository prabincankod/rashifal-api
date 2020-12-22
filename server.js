const express = require("express");
const app = express();
const request = require("request");
const cheerio = require("cheerio");

app.get("/", (request, response) => {
  response.send("googal");
});

app.get("/:sign", (req, res) => {
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

      break;
    default:
      n = "I have never heard of that fruit...";
  }
  console.log(n);

  request("https://www.hamropatro.com/rashifal/daily/" + n),
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const prediction = $(".desc")
          .find("p")
          .text();
        console.log(prediction);

        const obj = {
          sun_sign: "Leo",
          desc: prediction
        };
        console.log(obj);
        res.send(obj);
      }
    };
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
