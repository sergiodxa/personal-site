import globby from "globby";
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";
import matter from "gray-matter";
import { Article } from "types/article";

const readFile = promisify(fs.readFile);

export default async function readListArticles(): Promise<Article[]> {
  const globs = await globby(resolve("./articles/**/*.mdx"));
  const slugs = globs.map((glob) => {
    const path = "/articles/";
    return glob.slice(glob.indexOf(path), -4);
  });
  const files = await Promise.all(globs.map((path) => readFile(path, "utf-8")));
  const matters = files.map((file, index) => ({
    ...(matter(file).data as Article),
    slug: slugs[index],
  }));

  return matters;
}
