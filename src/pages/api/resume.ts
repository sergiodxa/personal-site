import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

const readFile = promisify(fs.readFile);

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export default async function resume(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.setHeader("cache-control", ONE_WEEK)
  res.send(await readFile(resolve("./resume.json")));
}
