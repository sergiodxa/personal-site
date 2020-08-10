import globby from "globby";
import fs from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { resolve } from "path";
import { Article } from "types/article";

const readFile = promisify(fs.readFile);

function parseSlug(path: string): string {
  return path.slice(path.indexOf("/articles"), path.length - 4);
}

export async function getListOfArticles(): Promise<Article[]> {
  const glob = await globby(resolve("./articles/**/*.mdx"));
  const files = await Promise.all(glob.map((path) => readFile(path, "utf-8")));
  const metas = files
    .map((file) => matter(file).data as Article)
    .map((meta, index) => ({ ...meta, slug: parseSlug(glob[index]) }))
    .map((meta) => JSON.parse(JSON.stringify(meta))); // remove dates
  return metas;
}
