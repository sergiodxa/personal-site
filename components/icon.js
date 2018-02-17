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
import Spinner from "./icons/spinner";
import Spotify from "./icons/spotify";
import Steam from "./icons/steam";
import Twitter from "./icons/twitter";
import YouTube from "./icons/youtube";

export default ({ name, extraLarge, large, small, extraSmall }) => {
  const size = extraLarge ? 128 : large ? 64 : small ? 16 : extraSmall ? 8 : 32;

  return (
    <i alt={name}>
      {(() => {
        switch (name.toLowerCase()) {
          case "codepen":
            return <Codepen size={size} />;
          case "email":
            return <Email size={size} />;
          case "essay":
            return <Essay size={size} />;
          case "github":
            return <GitHub size={size} />;
          case "instagram":
            return <Instagram size={size} />;
          case "linkedin":
            return <LinkedIn size={size} />;
          case "medium":
            return <Medium size={size} />;
          case "meetup":
            return <Meetup size={size} />;
          case "npm":
            return <NPM size={size} />;
          case "rss":
            return <RSS size={size} />;
          case "spinner":
            return <Spinner size={size} />;
          case "spotify":
            return <Spotify size={size} />;
          case "steam":
            return <Steam size={size} />;
          case "twitter":
            return <Twitter size={size} />;
          case "youtube":
            return <YouTube size={size} />;
        }
      })()}
    </i>
  );
};
