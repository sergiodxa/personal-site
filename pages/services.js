import compose from "recompose/compose";

import withAnalytics from "@sergiodxa/analytics/lib/react";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";

import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

import components from "../components/ui/index";
import Content from "../data/pages/services.mdx";

export default compose(withError, withAnalytics, withSW)(() => (
  <Main>
    <LinkedHeader />

    <section>
      <Content components={components} />
    </section>

    <style jsx>{`
      section {
        max-width: 720px;
        margin: 0 1em;
      }
      section :global(article) {
        font-size: 1.25em;
      }
      section :global(article li > a) {
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
));
