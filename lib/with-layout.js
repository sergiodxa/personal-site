import Main from "../layouts/main";
import Essay from "../layouts/essay";
import ReactDaily from "../layouts/react-daily";

function getLayout(name) {
  switch(name) {
    case "essay": return Essay;
    case "react-daily": return ReactDaily;
    default: return Main;
  }
}

function withLayout(name) {
  const Layout = getLayout(name);
  return meta => props => <Layout meta={meta} {...props} />
}

export default withLayout;
