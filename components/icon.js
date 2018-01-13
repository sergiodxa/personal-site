import Head from "next/head";

import Codepen from "./icons/codepen";
import Email from "./icons/email";
import GitHub from "./icons/github";
import Instagram from "./icons/instagram";
import LinkedIn from "./icons/linkedin";
import Medium from "./icons/medium";
import Meetup from "./icons/meetup";
import NPM from "./icons/npm";
import RSS from "./icons/rss";
import Spotify from "./icons/spotify";
import Steam from "./icons/steam";
import Twitter from "./icons/twitter";
import YouTube from "./icons/youtube";

export default ({ name }) => {
  return (
    <i alt={name}>
      {(() => {
        switch (name.toLowerCase()) {
          case "codepen":
            return <Codepen />;
          case "email":
            return <Email />;
          case "essay":
            return <Essay />;
          case "github":
            return <GitHub />;
          case "instagram":
            return <Instagram />;
          case "linkedin":
            return <LinkedIn />;
          case "medium":
            return <Medium />;
          case "meetup":
            return <Meetup />;
          case "npm":
            return <NPM />;
          case "rss":
            return <RSS />;
          case "spotify":
            return <Spotify />;
          case "steam":
            return <Steam />;
          case "twitter":
            return <Twitter />;
          case "youtube":
            return <YouTube />;
        }
      })()}
    </i>
  );
};
