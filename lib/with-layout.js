import dynamic from "next/dynamic";
import Main from "../layouts/main";

const Essay = dynamic(() => import("../layouts/essay"), {
  loading: () => null
});
const JSBasic = dynamic(() => import("../layouts/js-basic"), {
  loading: () => null
});
const Page = dynamic(() => import("../layouts/page"), { loading: () => null });

function getLayout(name) {
  switch (name) {
    case "essay":
      return Essay;
    case "page":
      return Page;
    case "js-basic":
      return JSBasic;
    default:
      return Main;
  }
}

function withLayout(name) {
  const Layout = getLayout(name);
  return meta => props => <Layout meta={meta} {...props} />;
}

export default withLayout;
