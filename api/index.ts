import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as cheerio from 'cheerio';
import axios from "axios";
interface IPrediction{
  sunsign : string
  prediction : string
}


export default async (req: VercelRequest, res: VercelResponse) => {
  const response = await axios("https://www.hamropatro.com/rashifal");
  const $ = cheerio.load(response.data);
  let predictions :IPrediction[]  = [];
  for (let i = 0; i < 12; i++) {
    const prediction = {
      sunsign: $("h3").eq(i).text(),
      prediction: $(".desc").find("p").eq(i).text().split(")", 2)[1],
    };
    predictions.push(prediction);
  }
  res.status(200).json(predictions);
};
