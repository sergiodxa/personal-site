import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import compose from "compose-function";
import withAnalytics from "next-ga";
import NProgress from "next-nprogress/component";
import { dark } from "@sergiodxa/palette";

import withSW from "../lib/with-sw";

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
        <NProgress color={dark} />
      </Container>
    );
  }
}

export default compose(
  withAnalytics("UA-48432002-3", Router),
  withSW
)(PersonalSite);
