import Main from "../layouts/main";
import Essay from "../layouts/essay";
import Page from "../layouts/page";

function getLayout(name) {
  switch(name) {
    case "essay": return Essay;
    case "page": return Page;
    default: return Main;
  }
}

function withLayout(name) {
  const Layout = getLayout(name);
  return meta => props => <Layout meta={meta} {...props} />
}

export default withLayout;
