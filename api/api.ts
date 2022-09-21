import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import cheerio from "cheerio";

export default async (req: VercelRequest, response: VercelResponse) => {
  const spaen: Array<string> = ["daily", "weekly", "monthly", "yearly"];

  let n;

  const { span, sign } = req.query;
  const obj1 = {
    message: "/api/:span can only have daily, weekly, monthly or yearly",
  };
  if (!spaen.includes(span)) return response.send(obj1);
  else {
    switch (sign) {
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

    try {
      const url = `https://www.hamropatro.com/rashifal/${span}/${n}`;
      console.log(url);
      axios.get(url).then((res) => {
        const $ = cheerio.load(res.data);
        const desc = $(".desc").find("p").text();
        const date = $(".articleTitleNew").find("span").text();
        const dt = date.split(" ");

        const sc = desc.replace("\n", "");
        const obj = {
          date:
            span === "daily"
              ? `${dt[2]} ${dt[1]} ${dt[0]} ${dt[3]}`
              : span === "weekly"
              ? `${dt[1]} - ${dt[3]} ${dt[0]}`
              : span === "monthly"
              ? `${dt[0]} ${dt[1]}`
              : `${dt[0]} ${dt[1]} ${dt[2]}`,
          sun_sign: dt[dt.length - 5],
          prediction: sc,
        };
        response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
        response.end(obj);
      });
    } catch {
      const failobj = {
        message: sign + " is meant to be a zodiac sign",
        other: n,
      };
response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
      response.end(failobj);
    }
  }
};
