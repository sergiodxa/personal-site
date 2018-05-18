import { Component } from "react";
import fetch from "isomorphic-fetch";
import compose from "recompose/compose";

import { blue } from "@sergiodxa/palette";
import { H1 } from "@sergiodxa/ui/lib/headings";
import { A, P } from "@sergiodxa/ui/lib/text";
import withAnalytics from "@sergiodxa/analytics/lib/react";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";
import Book from "../components/books/book";

import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

class BooksPage extends Component {
  render() {
    return (
      <Main>
        <LinkedHeader />

        <section>
          <H1>Books</H1>

          <Book
            title="Desarrollo de Aplicaciones Web con React.js y Redux.js"
            price="5.0"
            slug="react-redux"
            url="http://leanpub.com/react-redux"
            free
          >
            <P>
              Redux es una de las librerías de más crecimiento en popularidad en
              la comunidad de React y JavaScript en general. A pesar de ser
              pequeña por si misma su uso puede ser volverse complejo al
              juntarse con las librerías derivadas que han sido creadas por su
              comunidad.
            </P>
            <P>
              Bien usada, puede ayudar en desarrollo al facilitar el desarrollo
              de nuestra aplicación y en producción al simplificar la depuración
              de nuestra aplicación gracias a sus herramientas de desarrollo y
              su arquitectura basada en una serie de acciones puras que permiten
              tanto la reproducibilidad del flujo de un usuario como deshacer
              acciones que terminaron en error.
            </P>
            <P>
              Ante cualquier pregunta no dudes en contactarme a{" "}
              <A
                href="mailto:hello@sergiodxa.com?subject=Libro%20de%20React%20y%20Redux"
                color={blue}
              >
                hello@sergiodxa.com
              </A>{" "}
              o por Twitter como{" "}
              <A href="https://twitter.com/@sergiodxa" color={blue}>
                @sergiodxa
              </A>
            </P>
          </Book>
        </section>

        <style jsx>{`
          section {
            max-width: 720px;
            margin: 0 1em;
            padding-bottom: 6em;
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

export default compose(
  withError,
  Page => withAnalytics(Page, process.env.NODE_ENV === "production"),
  withSW
)(BooksPage);
