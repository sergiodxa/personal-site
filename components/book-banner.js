import { A, P } from "@sergiodxa/ui/lib/text";
import { Image } from "@sergiodxa/ui/lib/images";

import { gray, success } from "@sergiodxa/palette";

import resolveScopedStyles from "../lib/scoped-styles";

const scopedImage = resolveScopedStyles(
  <scope>
    <style jsx>{`
      img {
        display: none;
        flex: 1;
        margin-right: 1em;
        grid-area: cover;
      }
      @media (min-width: 720px) {
        img {
          display: inherit;
        }
      }
    `}</style>
  </scope>
);

const scopedText = resolveScopedStyles(
  <scope>
    <style jsx>{`
      p {
        grid-area: text;
      }
    `}</style>
  </scope>
);

const scopedLink = resolveScopedStyles(
  <scope>
    <style jsx>{`
      a {
        grid-area: link;
        text-align: right;
      }
    `}</style>
  </scope>
);

function Banner({ src, children, href }) {
  return (
    <div>
      <Image
        src={src}
        width="120"
        height="172"
        className={scopedImage.className}
      />
      <P className={scopedText.className}>{children}</P>
      <A
        href={href}
        target="_blank"
        rel="nofollow noopener"
        color={success}
        className={scopedLink.className}
      >
        Get it!
      </A>
      {scopedImage.styles}
      {scopedText.styles}
      {scopedLink.styles}
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: auto;
          grid-template-rows: auto auto;
          grid-template-areas: "text" "link";
          align-items: center;
          margin: 0.75em;
          border: 1px solid ${gray};
          padding: 0.75em;
        }
        @media (min-width: 720px) {
          div {
            grid-template-columns: 120px auto;
            grid-template-rows: auto auto;
            grid-column-gap: 20px;
            grid-template-areas: "cover text" "cover link";
          }
        }
      `}</style>
    </div>
  );
}

function BookBanner({ tags }) {
  if (tags.indexOf("Redux") >= 0) {
    return (
      <Banner
        src="/static/books/react-redux-kindle.png"
        href="https://leanpub.com/react-redux"
      >
        I published a book with this content and more about React.js and
        Redux.js. The book can be purchased <strong>totally free</strong>.
      </Banner>
    );
  }

  return null;
}

export default BookBanner;
