import * as React from "react";
import { GetStaticProps } from "next";
import { read } from "gray-matter";
import { resolve } from "path";
import useLinks from "data/links";
import Navigation from "components/navigation";
import Title from "components/title";
import Description from "components/description";

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
    <>
      <Navigation />
      <main id="hero" className="max-w-screen-md mx-auto px-4 space-y-8 mb-8">
        <Title>
          Bookmarks
        </Title>

        <Description>
          These are links that I have found interesting and worth to save and
          share them with others.
        </Description>

        <section className="space-y-4 md:max-w-screen-md md:mx-auto">
          {links.map((link) => (
            <LinkItem key={link.url} {...link} />
          ))}
        </section>
      </main>
    </>
  );
}

function LinkItem({ url, title }: Link) {
  return (
    <article>
      <a href={url} title={title} className="underline text-yellow-500 visited:text-yellow-600 hover:text-white light:text-indigo-500 light:visited:text-indigo-600 light:hover:text-indigo-900">
        <h3 className="text-md md:text-lg tracking-wider leading-normal font-semibold">{title}</h3>
      </a>
    </article>
  );
}
