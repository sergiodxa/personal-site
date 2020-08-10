import fs from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { resolve } from "path";
import { Article } from "types/article";

const readFile = promisify(fs.readFile);

export async function getArticle(
  slug: string
): Promise<readonly [Article, string]> {
  const path = resolve(`./articles/${slug}.mdx`);
  const file = await readFile(path, "utf8");
  const { data, content } = (matter(file) as unknown) as {
    data: Article;
    content: string;
  };
  return [JSON.parse(JSON.stringify(data)), content] as const;
}
