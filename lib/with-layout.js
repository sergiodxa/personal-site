import dynamic from "next/dynamic";

const Essay = dynamic(import("../layouts/essay"));
const JSBasic = dynamic(import("../layouts/js-basic"));
const Main = dynamic(import("../layouts/main"));
const Page = dynamic(import("../layouts/page"));

function getLayout(name) {
  switch(name) {
    case "essay": return Essay;
    case "page": return Page;
    case "js-basic": return JSBasic;
    default: return Main;
  }
}

function withLayout(name) {
  const Layout = getLayout(name);
  return meta => props => <Layout meta={meta} {...props} />
}

export default withLayout;
