import Essay from "../../layouts/essay";

import Article, {
  meta
} from "../../data/essays/an-accessible-approach-to-frontend-testing.mdx";

import components from "../../components/ui/index";

export default () => (
  <Essay {...meta}>
    <Article components={components} />
  </Essay>
);
