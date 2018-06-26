import Main from "../layouts/main";
import Essay from "../layouts/essay";

function getLayout(name) {
  switch(name) {
    case "essay": return Essay;
    default: return Main;
  }
}

function withLayout(name) {
  const Layout = getLayout(name);
  return meta => props => <Layout meta={meta} {...props} />
}

export default withLayout;
