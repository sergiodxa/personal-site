import { A, P } from "@sergiodxa/ui/lib/text";
import { Image } from "@sergiodxa/ui/lib/images";

import { gray, success } from "@sergiodxa/palette";

function BookBanner({ tags }) {
  if (tags.indexOf("Redux") >= 0) {

    return (
      <div>
        <Image
          src="/static/books/react-redux-kindle.png"
          width="120"
          height="172"
          style={{ flex: "1", marginRight: "1em" }}
        />
        <P>
          I published a book with this content and more about React.js and
          Redux.js. The book can be purchased <strong>totally free</strong>.
          <br />
          <A
            href="https://leanpub.com/react-redux"
            target="_blank"
            rel="nofollow noopener"
            color={success}
            style={{ float: "left", marginTop: "1em" }}
          >
            Get it!
          </A>
        </P>
        <style jsx>{`
          div {
            display: flex;
            align-items: center;
            margin: 0.75em;
            border: 1px solid ${gray};
            padding: 0.75em;
          }
        `}</style>
      </div>
    );
  }

  return null;
}

export default BookBanner;
