import compose from "recompose/compose";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";
import { H1 } from "../components/ui/heading";
import { A, P } from "../components/ui/text";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

export default compose(withError, withGA, withSW)(() => (
  <Main>
    <LinkedHeader />
    <section>
      <H1>Contact me</H1>

      <P>Do you want to contact me?</P>

      <P>
        You can send me a tweet to{" "}
        <A color="blue" href="https://twitter.com/sergiodxa">
          @sergiodxa
        </A>{" "}
        or an email to{" "}
        <A color="blue" href="mailto:hello@sergiodxa.com?subject=Contact">
          hello@sergiodxa.com
        </A>
      </P>
    </section>

    <style jsx>{`
      section {
        max-width: 1000px;
        margin: 0 1em;
        font-size: 1.5em;
      }
      @media (min-width: 720px) {
        section {
          margin: 0 auto;
        }
      }
    `}</style>
  </Main>
));
