import React from "react";
import App, { Container } from "next/app";
import compose from "recompose/compose";
import withGA from "next-ga";

import withError from "../lib/hoc/with-error";
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
      </Container>
    );
  }
}

export default compose(
  withError,
  withGA("UA-48432002-3"),
  withSW
)(PersonalSite);
