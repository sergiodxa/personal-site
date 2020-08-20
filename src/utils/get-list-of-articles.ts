import matter from "gray-matter";
import { Article } from "types";
import { collectedNotes } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

async function getNotes() {
  const { site, notes } = await cn.site(process.env.CN_SITE_PATH);

  // fetch all pages
  if (notes.length < site.total_notes) {
    for await (let page of Array.from(
      { length: Math.ceil(site.total_notes / 40) },
      (_, index) => index + 1
    )) {
      if (page === 1) continue;
      const res = await cn.site(process.env.CN_SITE_PATH, page);
      notes.push(...res.notes);
    }
  }

  return notes;
}

export async function getListOfArticles(): Promise<Article[]> {
  const notes = await getNotes();

  return notes
    .filter((note) => note.visibility === "public")
    .map((note) => [note, matter(note.body).data as Article] as const)
    .map(([note, meta]) => ({
      ...meta,
      title: meta.title ?? note.title,
      description: meta.description ?? note.headline,
      date: new Date(meta.date).toJSON() ?? note.created_at,
      slug: `/articles/${note.path}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
