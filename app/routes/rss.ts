import { LoaderFunction } from "remix";

export let loader: LoaderFunction = () => {
  return fetch("https://collectednotes.com/sergiodxa/feed/public_site.rss");
};
