import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { read } from "gray-matter";

export default async function resume(_: NextApiRequest, res: NextApiResponse) {
  const path = resolve("./links.yml");
  const { data } = read(path);
  res.setHeader("content-type", "application/json");
  res.send(data);
}
