import matter from "gray-matter";
import { Article } from "types/article";
import { collectedNotes } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export async function getListOfArticles(): Promise<Article[]> {
  const notes = await cn.latestNotes(Number(process.env.CN_SITE_ID));

  return notes
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
}
