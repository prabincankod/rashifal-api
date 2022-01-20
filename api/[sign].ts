import type { VercelRequest, VercelResponse } from "@vercel/node";

const sunSigns = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

export default async (req: VercelRequest, res: VercelResponse) => {
  const { sign } = req.query;

  res.status(200).send("Hello World");
};
