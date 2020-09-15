import { GetStaticProps, GetStaticPaths } from "next";
import { collectedNotes } from "collected-notes";
import { ArticlePageProps, ArticlePageQuery, Meta } from "types";
import { ArticleLayout } from "layouts/article";
import matter from "gray-matter";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

const CN_SITE_PATH = process.env.CN_SITE_PATH;

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  ArticlePageQuery
> = async ({ params }) => {
  const [{ site }, { note, body }, links] = await Promise.all([
    cn.site(CN_SITE_PATH),
    cn.body(CN_SITE_PATH, params.path.join("/")),
    cn.links(CN_SITE_PATH, params.path.join("/"), "json"),
  ]);
  const meta = JSON.parse(JSON.stringify(matter(note.body).data)) as Meta;
  return { props: { note, site, body, links, meta }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<ArticlePageQuery> = async () => {
  const { site, notes } = await cn.site(CN_SITE_PATH, 1, "public");

  // fetch all pages
  if (notes.length < site.total_notes) {
    for await (let page of Array.from(
      { length: Math.ceil(site.total_notes / 40) },
      (_, index) => index + 1
    )) {
      if (page === 1) continue;
      const res = await cn.site(CN_SITE_PATH, page);
      notes.push(...res.notes);
    }
  }

  return {
    paths: notes.map((note) => ({ params: { path: note.path.split("/") } })),
    fallback: "unstable_blocking",
  };
};

export default ArticleLayout;
