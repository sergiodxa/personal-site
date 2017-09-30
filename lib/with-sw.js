import { Component } from 'react';

function isLocal() {
  return location.hostname === 'localhost';
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
      if (isLocal()) return;

      try {
        await isSupported();
        await register();
        console.log('ServiceWorker registration successful');
      } catch (error) {
        console.warn('ServiceWorker registration failed', error.message);
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };
