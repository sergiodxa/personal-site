import { NextApiRequest, NextApiResponse } from "next";
import { collectedNotes, Note } from "collected-notes";
import matter from "gray-matter";
import { Meta, SearchResults } from "types";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

function unwrap<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse<SearchResults>
) {
  const { term, page = 1 } = req.query;
  const notes = await cn.search(
    process.env.CN_SITE_PATH,
    unwrap(term),
    unwrap((page as unknown) as number),
    "public"
  );
  res.json(
    notes
      .map((note) => [note, matter(note.body).data as Meta] as const)
      .map(([note, meta]) => ({
        ...note,
        meta: {
          title: note.title,
          description: meta.description ?? "",
          date: new Date(meta.date).toJSON() ?? note.created_at,
          slug: `/articles/${note.path}`,
          tags: meta.tags ?? "",
        },
      }))
  );
}
