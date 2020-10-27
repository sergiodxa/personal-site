import { GetStaticProps } from "next";
import { collectedNotes } from "collected-notes";
import { HomePageProps, Meta } from "types";
import { HomeLayout } from "layouts/home";
import { getBookmarks } from "utils/get-bookmarks";
import matter from "gray-matter";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [bookmarks, { site, notes }] = await Promise.all([
    getBookmarks(10),
    cn.site(process.env.CN_SITE_PATH, 1, "public_site"),
  ]);

  // fetch all pages
  if (notes.length < site.total_notes) {
    for await (let page of Array.from(
      { length: Math.ceil(site.total_notes / 40) },
      (_, index) => index + 1
    )) {
      if (page === 1) continue;
      const res = await cn.site(process.env.CN_SITE_PATH, page, "public_site");
      notes.push(...res.notes);
    }
  }

  return {
    props: {
      site,
      bookmarks,
      notes: notes
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
        .sort(
          (a, b) =>
            new Date(new Date(b.meta.date)).getTime() -
            new Date(new Date(a.meta.date)).getTime()
        )
        .slice(0, 10),
    },
    revalidate: 1,
  };
};

export default HomeLayout;
