import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import fs from "fs";
import { promisify } from "util";
import { resolve } from "path";
import marked from "marked";
import globby from "globby";
import useArticle from "data/articles";

const readFile = promisify(fs.readFile);

type Params = { slug: string[] };

type Props = {
  article: string;
  slug: string[];
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const globs = await globby(resolve("./articles/**/*.mdx"));
  const paths = globs.map((glob) => {
    const path = "/articles/";
    return glob.slice(glob.indexOf(path), -4);
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params: { slug = [] },
}) => {
  const article = await readFile(
    resolve("./articles/", slug.join("/") + ".mdx"),
    "utf-8"
  );
  return { props: { article, slug } };
};

export default function ArticlePage(props: Props) {
  const { data } = useArticle(props.slug, props.article);
  const { isFallback } = useRouter();
  if (isFallback) return <h1>Loading...</h1>;
  const articleHTML = marked(data);
  return (
    <main>
      <article dangerouslySetInnerHTML={{ __html: articleHTML }} />
    </main>
  );
}
