import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

const readFile = promisify(fs.readFile);

export default async function resume(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader("content-type", "application/json");
  res.send(await readFile(resolve("./resume.json")));
}
