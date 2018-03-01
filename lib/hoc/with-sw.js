import { Component } from "react";

import { event, warning } from "../analytics.js";

function isLocal() {
  return location.hostname === "localhost"
    ? Promise.resolve(true)
    : Promise.resolve(false);
}

function isSupported() {
  if (!("serviceWorker" in navigator)) {
    return Promise.reject(new ReferenceError("ServiceWorkers not supported"));
  }
  return Promise.resolve();
}

function register() {
  return navigator.serviceWorker.register("/service-worker.js");
}

export default WrappedComponent => {
  class WithSW extends Component {
    async componentDidMount() {
      if (await isLocal()) return;
      await isSupported();
      await register();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  if (WrappedComponent.getInitialProps) {
    WithSW.getInitialProps = WrappedComponent.getInitialProps;
  }

  return WithSW;
};
