import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/sobre-el-ecosistema-y-la-fatiga-de-javascript.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
