import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import * as cheerio from 'cheerio';

export default async (req: VercelRequest, response: VercelResponse) => {
  const spans = ["daily", "weekly", "monthly", "yearly"];

  let nepaliSign;

  const { span, sign } = req.query;




  if (!spans.includes(span as string)) {
    return response.send({
      message: "/api/:span can only have daily, weekly, monthly or yearly",
    });
  }



  switch (sign) {
    case "aries":
      nepaliSign = "mesh";
      break;
    case "taurus":
      nepaliSign = "brish";
      break;
    case "gemini":
      nepaliSign = "mithun";
      break;
    case "cancer":
      nepaliSign = "karkat";
      break;
    case "leo":
      nepaliSign = "singha";
      break;
    case "virgo":
      nepaliSign = "kanya";
      break;
    case "libra":
      nepaliSign = "tula";
      break;
    case "scorpio":
      nepaliSign = "brischik";
      break;
    case "sagittarius":
      nepaliSign = "dhanu";
      break;
    case "capricorn":
      nepaliSign = "makar";
      break;
    case "aquarius":
      nepaliSign = "kumbha";
      break;
    case "pisces":
      nepaliSign = "meen";
      break;
    default:
      return response.send({ "message": "please enter a valid sun sign" })
      break;

      try {
        const url = `https://www.hamropatro.com/rashifal/${span}/${nepaliSign}`;
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
          response.send(obj);
        });
      } catch {
        const failobj = {
          message: sign + " is meant to be a zodiac sign",
          other: nepaliSign,
        };

        response.send(failobj);
      }
  }
};