import compose from "recompose/compose";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";
import { H1 } from "../components/ui/heading";
import markdown from "../lib/markdown";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

const content = markdown(`
I can give **consultancy** and **workshops** for your company or startup.

The following is a list of technologies I can help with:

* [JavaScript](https://www.javascript.com)
* [React.js](https://reactjs.org)
* [Next.js](https://github.com/zeit/next.js)
* [Now.sh](https://now.sh)
* [Micro](https://github.com/zeit/micro)
* [GraphQL](http://graphql.org)
* Frontend Architecture

If your company is based on **Perú** or **Buenos Aires, Argentina** I can go physically to your office. Outside those places I should do an online streaming or charge you the travel costs in the final price.

If you are interested send me an email to [hello@sergiodxa.com](mailto:hello@sergiodxa.com?subject=Services)
`)

export default compose(withError, withGA, withSW)(() => (
  <Main>
    <LinkedHeader />

    <section>
      <H1>Do you want my help?</H1>

      <article>{content}</article>
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
));
