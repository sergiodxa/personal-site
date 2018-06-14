import { LinkButton } from "@sergiodxa/ui/lib/button";
import { H2 } from "@sergiodxa/ui/lib/headings";

export default ({ title, slug, children, url, free, price }) => (
  <article className="grid">
    <div className="title">
      <H2>{title}</H2>
    </div>

    <figure className="cover">
      <img
        src={`/static/books/${slug}-kindle.png`}
        width="300"
        role="presentational"
      />
    </figure>

    <div className="meta">
      <div className="link">
        <LinkButton href={url}>
          Purchase it for {free ? "Free" : `US$${price}`}
        </LinkButton>
      </div>
    </div>

    <div className="description">{children}</div>

    <style jsx>{`
      .grid {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto auto auto auto;
        grid-template-areas:
          "title"
          "cover"
          "description"
          "meta";
      }

      .title {
        grid-area: title;
        margin-bottom: 2em;
      }

      .cover {
        grid-area: cover;
        user-select: none;
      }
      .cover img {
        max-width: 100%;
      }

      .description {
        grid-area: description;
        padding: 0 0.5em;
      }

      .description :global(:first-child) {
        margin-top: 0;
      }

      .description :global(:last-child) {
        margin-bottom: 0;
      }

      .meta {
        grid-area: meta;
        text-align: center;
      }

      .link {
        user-select: none;
      }

      .description :global(a:hover),
      .link :global(a:hover) {
        text-decoration: underline;
      }

      figure {
        margin: 0;
      }

      @media (max-width: 720px) {
        .cover {
          text-align: center;
          margin: 0 auto;
        }
        .cover img {
          height: 390px;
          width: 300px;
        }
        .meta {
          margin: 2em 0 3em;
        }
      }

      @media (min-width: 720px) {
        .grid {
          grid-template-columns: 320px auto;
          grid-template-rows: auto auto auto;
          grid-template-areas:
            "title title"
            "cover description"
            "cover meta";
        }
        .title {
          text-align: center;
        }
        .meta {
          text-align: right;
        }
      }
    `}</style>
  </article>
);
