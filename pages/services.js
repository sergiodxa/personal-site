import compose from "recompose/compose";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";
import { H1 } from "../components/ui/heading";
import { A, P } from "../components/ui/text";
import { UL, LI } from "../components/ui/list";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

export default compose(withError, withGA, withSW)(() => (
  <Main>
    <LinkedHeader />

    <section>
      <H1>Do you want my help?</H1>

      <article>
        <P>
          I give <strong>consultancy</strong> and <strong>workshops</strong> for
          your company or startup.
        </P>

        <P>The following is a list of technologies I can help with:</P>

        <UL>
          <LI>
            <A href="https://www.javascript.com/" rel="nofollow">
              JavaScript
            </A>
          </LI>
          <LI>
            <A href="https://reactjs.org" rel="nofollow">
              React.js
            </A>
          </LI>
          <LI>
            <A href="https://github.com/zeit/next.js" rel="nofollow">
              Next.js
            </A>
          </LI>
          <LI>
            <A href="https://now.sh" rel="nofollow">
              Now.sh
            </A>
          </LI>
          <LI>
            <A href="https://github.com/zeit/micro" rel="nofollow">
              Micro
            </A>
          </LI>
          <LI>
            <A href="http://graphql.org/" rel="nofollow">
              GraphQL
            </A>
          </LI>
          <LI>Frontend Architecture</LI>
        </UL>

        <P>
          If your company is in <strong>Perú or Buenos Aires, Argentina</strong>{" "}
          I can go physically to your office. Outside those places I should do
          an online streaming or charge you the travel costs in the final price.
        </P>

        <P>
          If you are interested send me an email to{" "}
          <A color="blue" href="mailto:hello@sergiodxa.com?subject=Services">
            hello@sergiodxa.com
          </A>
        </P>
      </article>
    </section>

    <style jsx>{`
      section {
        max-width: 1000px;
        margin: 0 1em;
      }
      article {
        font-size: 1.25em;
      }
      @media (min-width: 720px) {
        section {
          margin: 0 auto;
        }
      }
    `}</style>
  </Main>
));
