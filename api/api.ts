import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as cheerio from "cheerio";

const signMap: Record<string, string> = {
  aries: "mesh",
  taurus: "brish",
  gemini: "mithun",
  cancer: "karkat",
  leo: "singha",
  virgo: "kanya",
  libra: "tula",
  scorpio: "brischik",
  sagittarius: "dhanu",
  capricorn: "makar",
  aquarius: "kumbha",
  pisces: "meen",
};

const spans = ["daily", "weekly", "monthly", "yearly"];

export default async (req: VercelRequest, res: VercelResponse) => {
  const { span, sign } = req.query;

  if (!span || typeof span !== "string" || !spans.includes(span)) {
    return res.status(400).send({
      message: "span can only be one of daily, weekly, monthly or yearly",
    });
  }

  if (!sign || typeof sign !== "string" || !(sign.toLowerCase() in signMap)) {
    return res.status(400).send({ message: "please enter a valid sun sign" });
  }

  const nepaliSign = signMap[sign.toLowerCase()];
  const url = `https://www.hamropatro.com/rashifal/${span}/${nepaliSign}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    const desc = $("article > p").eq(1).text().replace("\n", "").trim();
    const date = $("article > header > span").eq(1).text()


    return res.send({
      date: date,
      sun_sign: signMap[sign],
      prediction: desc,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: `Failed to fetch rashifal for ${sign}`,
      nepaliSign,
      error: error.message,
    });
  }
};
