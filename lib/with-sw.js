import { Component } from 'react';

import { hasInitialized, logEvent, logException } from './analytics.js';

function isLocal() {
  return location.hostname === 'localhost'
    ? Promise.resolve(true)
    : Promise.resolve(false);
}

function isSupported() {
  if (!('serviceWorker' in navigator)) {
    return Promise.reject(new ReferenceError('ServiceWorkers not supported'));
  }
  return Promise.resolve();
}

function register() {
  return navigator.serviceWorker.register('/service-worker.js');
}

export default Page =>
  class extends Component {
    async componentDidMount() {
      if (await isLocal()) return;

      try {
        await isSupported();
        await register();
        if (hasInitialized()) {
          logEvent('ServiceWorker', 'ServiceWorker registration successful');
        } else {
          console.log('ServiceWorker registration successful');
        }
      } catch (error) {
        if (hasInitialized()) {
          logException(`ServiceWorker registration failed: ${error.message}`);
        } else {
          console.warn('ServiceWorker registration failed', error.message);
        }
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };
