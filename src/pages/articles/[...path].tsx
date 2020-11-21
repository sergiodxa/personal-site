import renderToString from "next-mdx-remote/render-to-string";
import { GetStaticProps, GetStaticPaths } from "next";
import { collectedNotes, Markdown } from "collected-notes";
import { ArticlePageProps, ArticlePageQuery, Meta } from "types";
import { ArticleLayout, components } from "layouts/article";
import matter from "gray-matter";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

const CN_SITE_PATH = process.env.CN_SITE_PATH;

async function parseBody({
  isMDX,
  content,
  notePath,
}: {
  isMDX: boolean;
  content: string;
  notePath: string;
}): Promise<string> {
  if (isMDX) {
    return await renderToString(content, { components });
  } else {
    const { body } = await cn.body(CN_SITE_PATH, notePath);
    return body;
  }
}

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  ArticlePageQuery
> = async ({ params }) => {
  const notePath = params.path.join("/");
  const [{ site }, note, links] = await Promise.all([
    cn.site(CN_SITE_PATH),
    cn.read(CN_SITE_PATH, notePath),
    cn.links(CN_SITE_PATH, notePath, "json"),
  ]);
  const { content, data: meta } = (matter(note.body) as unknown) as {
    data: Meta;
    content: Markdown;
  };
  const body = await parseBody({
    isMDX: meta.tags?.includes("mdx") ?? false,
    content,
    notePath,
  });
  return { props: { note, site, body, links, meta }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<ArticlePageQuery> = async () => {
  const { site, notes } = await cn.site(CN_SITE_PATH, 1, "public_site");

  // fetch all pages
  if (notes.length < site.total_notes) {
    for await (let page of Array.from(
      { length: Math.ceil(site.total_notes / 40) },
      (_, index) => index + 1
    )) {
      if (page === 1) continue;
      const res = await cn.site(CN_SITE_PATH, page, "public_site");
      notes.push(...res.notes);
    }
  }

  return {
    paths: notes.map((note) => ({ params: { path: note.path.split("/") } })),
    fallback: "blocking",
  };
};

export default ArticleLayout;
