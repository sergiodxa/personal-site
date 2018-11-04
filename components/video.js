import { string } from "prop-types";

function formatYoutubeEmbed(id) {
  return `https://www.youtube.com/embed/${id}`;
}

function Video({ youtube, src = formatYoutubeEmbed(youtube), caption }) {
  return (
    <>
      <div className={caption ? "has-caption" : ""}>
        <iframe src={src} />
        <style jsx>{`
          div {
            margin: 2em 0;
            position: relative;
            padding-bottom: 56.25%; /* 16:9 */
            padding-top: 25px;
            height: 0;
          }
          div iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .has-caption {
            margin-bottom: .5em;
          }
        `}</style>
      </div>
      {caption && (
        <center>
          <small>
            <small>{caption}</small>
          </small>
        </center>
      )}
    </>
  );
}

Video.propTypes = {
  src: string.isRequired
};

export default Video;
