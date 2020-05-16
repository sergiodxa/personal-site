import { FaDev, FaTwitter, FaGithub, FaNpm, FaEnvelope } from "react-icons/fa";
import Title from "components/title";
import Description from "components/description";
import { motion } from "framer-motion";

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
    <motion.main
      id="hero"
      className="max-w-screen-md mx-auto px-4 space-y-8"
    >
      <Title>Sergio Xalambrí</Title>

      <Description>T-Shaped Frontend Engineer</Description>

      <aside className="text-yellow-500 light:text-indigo-500 flex flex-row space-x-4">
        {social.map(({ icon, href, title }) => (
          <a key={href} href={href} title={title}>
            {icon}
          </a>
        ))}
      </aside>
    </motion.main>
  );
}
