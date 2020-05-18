import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";

const readFile = promisify(fs.readFile);

export default async function resume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;
  const article = await readFile(
    resolve(
      "./articles/",
      (Array.isArray(slug) ? slug.join("/") : slug) + ".mdx"
    ),
    "utf-8"
  );
  res.json({ article });
}
