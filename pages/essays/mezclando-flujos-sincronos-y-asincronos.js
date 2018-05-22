import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/mezclando-flujos-sincronos-y-asincronos.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
