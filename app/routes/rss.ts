import { LoaderFunction, redirect } from "remix";

export let loader: LoaderFunction = async () => {
  return redirect("https://collectednotes.com/sergiodxa/feed/public_site.rss");
};
