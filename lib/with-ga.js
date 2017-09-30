import { Component } from 'react';

import { initGA, logPageView } from './analytics';

function isLocal() {
  return location.hostname === 'localhost';
}

export default Page =>
  class extends Component {
    componentDidMount() {
      if (isLocal()) return;

      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();
    }

    render() {
      return <Page {...this.props} />;
    }
  };
