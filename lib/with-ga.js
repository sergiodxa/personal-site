import { Component } from 'react'

import { initGA, logPageView } from './analytics'

export default Page =>
  class extends Component {
    componentDidMount() {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
    }

    render() {
      return <Page {...this.props} />
    }
  }
