import { Component } from "react";
import fetch from "isomorphic-fetch";
import compose from "recompose/compose";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";
import { H1 } from "../components/ui/heading";
import Book from "../components/books/book";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

const isServer = typeof window === "undefined";

class BooksPage extends Component {
  static async getInitialProps() {
    let reactRedux = undefined;

    if (!isServer) {
      reactRedux = localStorage.getItem("book-reactredux") || undefined;
      if (reactRedux) JSON.parse(reactRedux);
    }

    if (!reactRedux) {
      reactRedux = await fetch(
        "https://leanpub.com/react-redux.json"
      ).then(res => res.json());

      if (!isServer) {
        localStorage.setItem("book-reactredux", JSON.stringify(reactRedux));
      }
    }

    return { reactRedux };
  }
  render() {
    const { reactRedux } = this.props;

    return (
      <Main>
        <LinkedHeader />

        <section>
          <H1>Books</H1>

          <Book
            {...reactRedux}
            description={reactRedux.about_the_book}
            free={reactRedux.minimum_price === "0.0"}
            price={reactRedux.suggested_price}
          />
        </section>

        <style jsx>{`
          section {
            max-width: 720px;
            margin: 0 1em;
          }
          article {
            font-size: 1.25em;
          }
          article :global(li > a) {
            color: black;
            text-decoration: none;
          }
          @media (min-width: 720px) {
            section {
              margin: 0 auto;
            }
          }
        `}</style>
      </Main>
    );
  }
}

export default compose(withError, withGA, withSW)(BooksPage);
