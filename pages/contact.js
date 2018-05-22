import Main from "../layouts/main";
import { LinkedHeader } from "../components/header";

import components from "../components/ui/index";
import Content from "../data/pages/contact.mdx";

function ContactPage() {
  return (
    <Main>
      <LinkedHeader />
      <section>
        <Content components={components} />
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
  );
}

export default ContactPage;
