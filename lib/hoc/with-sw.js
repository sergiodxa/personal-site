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

async function alreadyRegistered() {
  const serviceWorker = await navigator.serviceWorker.getRegistration();
  return serviceWorker.active.status === "activated";
}

function register() {
  return navigator.serviceWorker.register("/service-worker.js");
}

export default WrappedComponent => {
  class WithSW extends Component {
    async componentDidMount() {
      if (await isLocal()) return;

      try {
        await isSupported();
        if (!await alreadyRegistered()) {
          event({
            action: "ServiceWorker",
            description: "Registration successful"
          });
        }
        await register();
      } catch (error) {
        warning({
          action: "ServiceWorker",
          description: `Registration failed: ${error.message}`
        });
      }
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
