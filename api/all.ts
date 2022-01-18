import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

import cheerio from "cheerio";
export default async (req: VercelRequest, res: VercelResponse) => {
  const response = await axios("https://www.hamropatro.com/rashifal");
  const $ = cheerio.load(response.data);
  let data = [];
  for (let i = 0; i < 12; i++) {
    const eachData = {
      sunsign: $("h3").eq(i).text(),
      prediction: $(".desc").find("p").eq(i).text().split(")", 2)[1],
    };
    data.push(eachData);
    console.log(eachData);
  }
  res.status(200).json(data);
};
