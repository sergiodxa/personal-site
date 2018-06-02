import { Component } from "react";
import Error from "next/error";

import { error } from "@sergiodxa/analytics";

export default WrappedComponent => {
  class WithError extends Component {
    state = { throw: false };

    componentDidCatch(error, info) {
      this.setState({ throw: true });
      console.error(
        { action: "uncaught-error", description: error.message },
        process.env.NODE_ENV === "production"
      );
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
