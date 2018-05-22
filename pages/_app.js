import React from "react";
import App, { Container } from "next/app";
import compose from "recompose/compose";
import withAnalytics from "@sergiodxa/analytics/lib/react";

import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

class PersonalSite extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default compose(
  withError,
  Page => withAnalytics(Page, process.env.NODE_ENV === "production"),
  withSW
)(PersonalSite);
