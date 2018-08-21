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
          case "patreon":
            return (
              <svg version="1.1" width={32} height={32}>
                <path
                  fill="#f96854"
                  d="M20.515.699c-6.352 0-11.52 5.168-11.52 11.52 0 6.333 5.168 11.484 11.52 11.484C26.848 23.703 32 18.551 32 12.219 32 5.867 26.848.699 20.515.699zM.004 31.383h5.627V.699H.004z"
                />
              </svg>
            );
          default:
            return null;
        }
      })()}
    </i>
  );
};
