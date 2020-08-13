import globby from "globby";
import fs from "fs";
import matter from "gray-matter";
import { promisify } from "util";
import { resolve } from "path";
import { Article } from "types/article";
import { collectedNotes } from "collected-notes";

const readFile = promisify(fs.readFile);
const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

function parseSlug(path: string): string {
  return path.slice(path.indexOf("/articles"), path.length - ".mdx".length);
}

export async function getListOfArticles(): Promise<Article[]> {
  const glob = await globby(resolve("./articles/**/*.mdx"));
  const files = await Promise.all(glob.map((path) => readFile(path, "utf-8")));
  const notes = await cn.latestNotes(Number(process.env.CN_SITE_ID));
  const metas = files
    .map((file) => matter(file).data as Article)
    .map((meta, index) => ({ ...meta, slug: parseSlug(glob[index]) }))
    .map((meta) => JSON.parse(JSON.stringify(meta))); // remove dates
  const notesMeta = notes
    .filter((note) => note.visibility === "public")
    .map((note) => [note, matter(note.body).data as Article] as const)
    .map(([note, meta]) => ({
      ...meta,
      title: meta.title ?? note.title,
      description: meta.description ?? note.headline,
      date: new Date(meta.date).toJSON() ?? note.created_at,
      published: true,
      slug: `/articles/${note.path}`,
    }));
  return [].concat(metas, notesMeta)
}
