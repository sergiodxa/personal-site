import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";
import matter from "gray-matter";

const readFile = promisify(fs.readFile);

type Link = { title: string; url: string; };

export async function getBookmarks(): Promise<Link[]> {
  const linksYML = await readFile(resolve("./links.yml"), "utf-8");
  const { links } = matter(linksYML).data;
  return links;
}
