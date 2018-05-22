import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/como-mantenerse-actualizado-con-el-ecosistema-de-javascript.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
