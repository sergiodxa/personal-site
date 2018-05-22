import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/how-to-keep-updated-with-the-javascript-ecosystem.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
