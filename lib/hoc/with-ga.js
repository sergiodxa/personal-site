import { Component } from "react";

import { event } from "../analytics";

function isLocal() {
  return location.hostname === "localhost";
}

export default WrappedComponent => {
  class WithGA extends Component {
    async componentDidMount() {
      if (isLocal()) return;

      await event({
        action: "page view",
        description: `User accessed ${window.location.pathname}`
      });
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
