import * as React from "react";
import { GetStaticProps } from "next";
import { read } from "gray-matter";
import { resolve } from "path";
import useLinks from "data/links";
import Navigation from "components/navigation";

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

  return { props: { links } };
};

export default function ResumePage(props: Props) {
  const {
    data: { links },
  } = useLinks(props);
  console.log(links);
  

  return (
    <>
      <Navigation />
      <main id="hero" className="max-w-screen-lg mx-auto px-4 space-y-8">
        <h1 className="font-semibold text-2xl md:text-4xl tracking-widest leading-none">
          Bookmarks
        </h1>

        <h2 className="text-yellow-500 text-md md:text-lg tracking-wide border-l-4 border-yellow-500 pl-4 -ml-4 leading-none">
          These are links that I have found interesting and worth to save and share them with others.
        </h2>
      </main>
    </>
  );
}
