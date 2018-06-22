import React from "react";
import App, { Container } from "next/app";
import compose from "recompose/compose";
import withAnalytics from "next-analytics";
import withNProgress from "next-nprogress";
import NProgressStyles from "next-nprogress/styles";
import { dark } from "@sergiodxa/palette";

import withSW from "../lib/hoc/with-sw";

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
        <NProgressStyles color={dark} />
      </Container>
    );
  }
}

export default compose(
  withAnalytics({ ga: "UA-48432002-3" }),
  withNProgress(),
  withSW
)(PersonalSite);
