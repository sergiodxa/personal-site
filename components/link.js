import { bool } from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { format, resolve, parse } from 'url';

export default class LinkWithData extends Link {
  static propTypes = {
    ...Link.propTypes,
    withData: bool
  };

  async prefetch() {
    if (!this.props.prefetch) return;
    if (typeof window === 'undefined') return;

    const url =
      typeof this.props.href !== 'string'
        ? format(this.props.href)
        : this.props.href;

    const { pathname } = window.location;
    const href = resolve(pathname, url);
    const { query } =
      typeof this.props.href !== 'string'
        ? this.props.href
        : parse(url, true);
    const Component = await Router.prefetch(href);

    if (this.props.withData && Component && Component.getInitialProps) {
      const ctx = { pathname: href, query, isVirtualCall: true };
      console.log(ctx);
      const props = await Component.getInitialProps(ctx);
      sessionStorage.setItem(url, JSON.stringify(props));
    }
  }
}
