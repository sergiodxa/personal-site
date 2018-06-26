import format from "date-fns/format";
import isValid from "date-fns/is_valid";

function PublishedAt({ dateTime, date }) {
  if (!isValid(date)) return null;
  return (
    <time className="publishedAt" dateTime={dateTime}>
      Posted on <b>{format(date, "MMMM DD, YYYY")}</b>
      <style jsx>{`
        .publishedAt {
          display: block;
          text-align: right;
        }

        @media (max-width: 767px) {
          .publishedAt {
            padding-right: 1em;
            padding-left: 1em;
          }
        }
      `}</style>
    </time>
  );
}

export default PublishedAt;
