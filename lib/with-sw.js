import { Component } from 'react'

export default Page =>
  class extends Component {
    async componentDidMount() {
      try {
        await this.isSupported()
        await this.register()
        console.log('ServiceWorker registration successful')
      } catch (error) {
        console.warn('ServiceWorker registration failed', err.message)
      }
    }

    isSupported() {
      if (!('serviceWorker' in navigator)) {
        return Promise.reject(new ReferenceError('ServiceWorkers not supported'))
      }
      return Promise.resolve()
    }

    register() {
      return navigator.serviceWorker.register('/service-worker.js')
    }

    render() {
      return <Page {...this.props} />
    }
  }
