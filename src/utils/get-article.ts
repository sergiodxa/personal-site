import matter from "gray-matter";
import { Article } from "types/article";
import { collectedNotes, Note } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

async function readFromCN(slug: string): Promise<readonly [Article, string]> {
  const note = (await cn.read(process.env.CN_SITE_PATH, slug, "json")) as Note;
  const links = await cn.links(Number(process.env.SITE_ID), note.id);

  let { data, content } = (matter(note.body) as unknown) as {
    data: Article;
    content: string;
  };

  data.links = links;

  // strip title from content
  if (content.startsWith("# ")) {
    content = content.split("\n").slice(1).join("\n");
  }

  // merge note data with frontmatter metadata
  data.title = data.title ?? note.title;
  data.description = data.description ?? note.headline;

  data.cn = true;

  return [JSON.parse(JSON.stringify(data)), content] as const;
}

export async function getArticle(
  slug: string
): Promise<readonly [Article, string]> {
  return await readFromCN(slug);
}
