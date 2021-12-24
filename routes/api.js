//expressjs route
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
router.get("/:span/:sign", (req, resp) => {
  const spans = ["daily", "weekly", "monthly", "yearly"];

  let n;
  let e = req.params.sign;
  const f = req.params.span;
  const obj1 = {
    message: "/api/:span can only have daily, weekly, monthly or yearly",
  };
  if (!spans.includes(f.toLowerCase())) return resp.send(obj1);
  else {
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
        break;
      case "aquarius":
        n = "kumbha";
        break;
      case "pisces":
        n = "meen";
        break;
    }
    let ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;
    const aip = ip.split(",", 1);

    if ((e = n)) {
      const url = `https://www.hamropatro.com/rashifal/${f}/${n}`;
      console.log(url);
      axios.get(url).then((res) => {
        const $ = cheerio.load(res.data);
        const desc = $(".desc").find("p").text();
        const date = $(".articleTitleNew").find("span").text();
        const dt = date.split(" ");

        const sc = desc.replace("\n", "");
        const obj = {
          date:
            f === "daily"
              ? `${dt[2]} ${dt[1]} ${dt[0]} ${dt[3]}`
              : f === "weekly"
              ? `${dt[1]} - ${dt[3]} ${dt[0]}`
              : f === "monthly"
              ? `${dt[0]} ${dt[1]}`
              : `${dt[0]} ${dt[1]} ${dt[2]}`,
          sun_sign: dt[dt.length - 5],
          prediction: sc,
          ip: aip[0],
        };
        resp.send(obj);
      });
    } else {
      const failobj = {
        message: req.params.sign + " is meant to be a zodiac sign",
        other: n,
      };

      resp.send(failobj);
    }
  }
});
module.exports = router;
