import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import exact from 'prop-types-exact';
import { format, resolve, parse } from 'url';

export default class LinkWithData extends Link {
  static propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    withData: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      (props, propName) => {
        const value = props[propName];

        if (typeof value === 'string') {
          warnLink(
            `Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>`
          );
        }

        return null;
      }
    ]).isRequired
  });

  async prefetch() {
    if (!this.props.prefetch) return;
    if (typeof window === 'undefined') return;

    const { pathname } = window.location;

    const href = resolve(pathname, this.href);

    const { query } =
      typeof this.props.href !== 'string' ? this.props.href : parse(url, true);

      const Component = await Router.prefetch(href);

    if (this.props.withData && Component && Component.getInitialProps) {
      const ctx = { pathname: href, query, isVirtualCall: true };
      await Component.getInitialProps(ctx);
    }
  }
}
