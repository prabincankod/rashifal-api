const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
router.get("/", async (req, res) => {
  const response = await axios("https://www.hamropatro.com/rashifal/daily/");
  const $ = cheerio.load(response.data);
  let da = [];
  for (let i = 0; i < 12; i++) {
    const data = {
      sunsign: $("h3").eq(i).text(),
      prediction: $(".desc").find("p").eq(i).text().split(")", 2)[1],
    };
    da.push(data);
  }
  res.send(da);
});

module.exports = router;
