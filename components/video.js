import { string } from "prop-types";

function Video({ src }) {
  return (
    <div>
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
      `}</style>
    </div>
  );
}

Video.propTypes = {
  src: string.isRequired
};

export default Video;
