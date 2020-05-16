import * as React from "react";
import { GetStaticProps } from "next";
import { read } from "gray-matter";
import { resolve } from "path";
import useLinks from "data/links";
import Title from "components/title";
import Description from "components/description";
import { motion } from "framer-motion";

interface Link {
  url: string;
  title: string;
}

interface Props {
  links: Link[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const path = resolve("./links.yml");
  const {
    data: { links },
  } = read(path);

  return { props: { links }, unstable_revalidate: 1 };
};

export default function ResumePage(props: Props) {
  const {
    data: { links },
  } = useLinks(props);

  return (
    <motion.main
      id="hero"
      className="max-w-screen-md mx-auto px-4 space-y-8 mb-8"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
    >
      <Title>Bookmarks</Title>

      <Description>
        These are links that I have found interesting and worth to save and
        share them with others.
      </Description>

      <section className="space-y-4 md:max-w-screen-md md:mx-auto">
        {links.map((link) => (
          <LinkItem key={link.url} {...link} />
        ))}
      </section>
    </motion.main>
  );
}

function LinkItem({ url, title }: Link) {
  const variants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    enter: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
    },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  };

  return (
    <motion.article variants={variants}>
      <a
        href={url}
        title={title}
        className="underline text-yellow-500 visited:text-yellow-600 hover:text-white light:text-indigo-500 light:visited:text-indigo-600 light:hover:text-indigo-900"
      >
        <h3 className="text-md md:text-lg tracking-wider leading-normal font-semibold">
          {title}
        </h3>
      </a>
    </motion.article>
  );
}
