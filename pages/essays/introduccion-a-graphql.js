import Essay from "../../layouts/essay";

import Article, { meta } from "../../data/essays/introduccion-a-graphql.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
