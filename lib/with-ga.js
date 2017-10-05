import { Component } from 'react';

import { hasInitialized, initGA, logPageView } from './analytics';

function isLocal() {
  return location.hostname === 'localhost';
}

export default Page =>
  class extends Component {
    componentDidMount() {
      if (isLocal()) return;

      if (!hasInitialized()) {
        initGA();
      }
      logPageView();
    }

    render() {
      return <Page {...this.props} />;
    }
  };
