import { Component } from "react";

import { hasInitialized, initGA, logPageView } from "../analytics";

function isLocal() {
  return location.hostname === "localhost";
}

export default WrappedComponent => {
  class WithGA extends Component {
    componentDidMount() {
      if (isLocal()) return;

      if (!hasInitialized()) {
        initGA();
      }
      logPageView();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  if (WrappedComponent.getInitialProps) {
    WithGA.getInitialProps = WrappedComponent.getInitialProps;
  }

  return WithGA;
};
