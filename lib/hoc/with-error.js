import { Component } from "react";
import Error from "next/error";

import { error } from "../analytics.js";

export default WrappedComponent => {
  class WithError extends Component {
    state = { throw: false };

    componentDidCatch(error, info) {
      this.setState({ throw: true });
      error({ "action": "uncaught-errorr" , "description": error.message });
    }

    render() {
      if (this.state.throw) {
        return <Error statusCode="500" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  if (WrappedComponent.getInitialProps) {
    WithError.getInitialProps = WrappedComponent.getInitialProps;
  }

  return WithError;
};
