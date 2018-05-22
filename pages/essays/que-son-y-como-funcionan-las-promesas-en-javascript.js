import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/que-son-y-como-funcionan-las-promesas-en-javascript.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
