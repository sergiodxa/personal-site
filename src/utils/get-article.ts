import matter from "gray-matter";
import { Meta } from "types";
import { collectedNotes, Note } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

async function readFromCN(slug: string): Promise<readonly [Meta, string]> {
  const note = (await cn.read(process.env.CN_SITE_PATH, slug, "json")) as Note;
  const links = await cn.links(Number(process.env.SITE_ID), note.id);
  const body = await cn.body(Number(process.env.SITE_ID), note.id);
console.log(body);
  let { data } = (matter(note.body) as unknown) as {
    data: Meta;
  };

  if (links) {
    data.links = links;
  }

  // merge note data with frontmatter metadata
  data.title = data.title ?? note.title;
  data.description = data.description ?? note.headline;

  data.cn = true;

  return [JSON.parse(JSON.stringify(data)), body.body] as const;
}

export async function getArticle(
  slug: string
): Promise<readonly [Meta, string]> {
  return await readFromCN(slug);
}
