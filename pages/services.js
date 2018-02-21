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
          I could give <strong>consultancy</strong> for your company or project
          or give a workshop at your company (or any event).
        </P>

        <P>The following is a list of technologies I can help you with:</P>

        <UL>
          <LI>
            <A href="https://www.javascript.com/">JavaScript</A>
          </LI>
          <LI>
            <A href="https://reactjs.org">React.js</A>
          </LI>
          <LI>
            <A href="https://github.com/zeit/next.js">Next.js</A>
          </LI>
          <LI>
            <A href="https://now.sh">Now.sh</A>
          </LI>
          <LI>Microservices</LI>
        </UL>
        <P>
          If your company is in Perú or Buenos Aires, Argentina I can go to your
          office. Outside those places I should do an online streaming or charge
          your the travel costs to the final price.
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
