import Codepen from "@sergiodxa/icons/lib/codepen";
import Dev from "@sergiodxa/icons/lib/dev";
import Email from "@sergiodxa/icons/lib/email";
import GitHub from "@sergiodxa/icons/lib/github";
import Instagram from "@sergiodxa/icons/lib/instagram";
import LinkedIn from "@sergiodxa/icons/lib/linkedin";
import Medium from "@sergiodxa/icons/lib/medium";
import Meetup from "@sergiodxa/icons/lib/meetup";
import NPM from "@sergiodxa/icons/lib/npm";
import RSS from "@sergiodxa/icons/lib/rss";
import Spinner from "@sergiodxa/icons/lib/spinner";
import Spotify from "@sergiodxa/icons/lib/spotify";
import Steam from "@sergiodxa/icons/lib/steam";
import Twitter from "@sergiodxa/icons/lib/twitter";
import YouTube from "@sergiodxa/icons/lib/youtube";

export default ({ name, extraLarge, large, small, extraSmall }) => {
  const size = extraLarge ? 128 : large ? 64 : small ? 16 : extraSmall ? 8 : 32;

  return (
    <i alt={name}>
      {(() => {
        switch (name.toLowerCase()) {
          case "codepen":
            return <Codepen size={size} />;
          case "dev":
            return <Dev size={size} />;
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
