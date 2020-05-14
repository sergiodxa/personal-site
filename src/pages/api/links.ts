import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { read } from "gray-matter";

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export default async function resume(_: NextApiRequest, res: NextApiResponse) {
  const path = resolve("./links.yml");
  const { data } = read(path);
  res.setHeader("content-type", "application/json");
  res.setHeader("cache-control", ONE_WEEK)
  res.send(data);
}
