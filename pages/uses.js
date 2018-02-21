import compose from "recompose/compose";

import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";
import { H1, H2 } from "../components/ui/heading";
import { A, P } from "../components/ui/text";
import { UL, LI } from "../components/ui/list";

import withGA from "../lib/hoc/with-ga";
import withSW from "../lib/hoc/with-sw";
import withError from "../lib/hoc/with-error";

export default compose(withError, withGA, withSW)(() => (
  <Main>
    <LinkedHeader />
    <section>
      <H1>What I use</H1>

      <article>
        <P>
          With the time I have used many different technologies to work. This is
          a list of my current stack.
        </P>

        <H2>Tools</H2>
        <UL>
          <LI>
            <A href="https://code.visualstudio.com/">Visual Studio Code</A> as
            my main IDE.
          </LI>
          <LI><A href="https://chrome.google.com">Google Chrome</A> as my main browser.</LI>
          <LI>
            <A href="https://prettier.io">Prettier</A> (with a VSCode plugin)
            with the default configuration.
          </LI>
          <LI>
            <A href="https://hyper.is/">Hyper</A> as my terminal.
          </LI>
          <LI>
            <A href="https://www.getpostman.com/">Postman</A> to try API
            endpoints
          </LI>
          <LI>
            <A href="https://github.com">GitHub</A> for my code repositories.
          </LI>
        </UL>

        <H2>Tech Stack</H2>
        <UL>
          <LI>
            <A href="https://www.javascript.com/">JavaScript</A> as my main
            programming language.
          </LI>
          <LI>
            <A href="https://reactjs.org">React.js</A> for UI creation.
          </LI>
          <LI>
            <A href="https://github.com/zeit/next.js">Next.js</A> as my Frontend
            framework.
          </LI>
          <LI>
            <A href="https://now.sh">Now.sh</A> for deploying applications to
            the cloud.
          </LI>
          <LI>
            <A href="https://github.com/zeit/micro">Micro</A> for creating
            microservices.
          </LI>
          <LI>
            <A href="http://graphql.org/">GraphQL</A> for API creations.
          </LI>
          <LI>
            <A href="http://travis-ci.org/">TravisCI</A> for continuous
            integration pipelines.
          </LI>
        </UL>
      </article>
    </section>

    <style jsx>{`
      section {
        max-width: 1000px;
        margin: 0 1em;
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
