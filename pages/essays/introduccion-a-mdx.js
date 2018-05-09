import Layout from "../../layouts/essay";

import Article, {
  title,
  date,
  slug
} from "../../data/essays/introduccion-a-mdx.mdx";

import components from "../../components/ui/index";

export default () => (
  <Layout
    title={title}
    date={date}
    slug={slug}
    content={<Article components={components} />}
    noParse
  />
);
