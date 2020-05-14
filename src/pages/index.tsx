import { FaDev, FaTwitter, FaGithub, FaNpm, FaEnvelope } from "react-icons/fa";
import Navigation from "components/navigation";

const social = [
  {
    icon: <FaTwitter className="w-5 h-5" />,
    href: "https://twitter.com/sergiodxa",
    title: "Twitter",
  },
  {
    icon: <FaGithub className="w-5 h-5" />,
    href: "https://github.com/sergiodxa",
    title: "GitHub",
  },
  {
    icon: <FaDev className="w-5 h-5" />,
    href: "https://dev.to/sergiodxa",
    title: "DEV",
  },
  {
    icon: <FaNpm className="w-5 h-5" />,
    href: "https://www.npmjs.com/~sergiodxa",
    title: "NPM",
  },
  {
    icon: <FaEnvelope className="w-5 h-5" />,
    href: "mailto:hello@sergiodxa.com",
    title: "Mail",
  },
];

export default function Home() {
  return (
    <>
      <Navigation />

      <main id="hero" className="max-w-screen-lg mx-auto px-4 space-y-8">
        <h1 className="font-semibold text-2xl tracking-widest leading-none">
          Sergio Xalambrí
        </h1>

        <h2 className="text-yellow-500 text-base tracking-wide border-l-4 border-yellow-500 pl-4 -ml-4 leading-none">
          T-Shaped Frontend Engineer
        </h2>

        <aside className="text-yellow-500 flex flex-row space-x-4">
          {social.map(({ icon, href, title }) => (
            <a key={href} href={href} title={title}>
              {icon}
            </a>
          ))}
        </aside>
      </main>
    </>
  );
}
