import { LoaderFunction } from "@remix-run/server-runtime";

export let loader: LoaderFunction = async () => {
  let script =
    "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-48432002-3');";
  return new Response(script, {
    headers: {
      "Content-Type": "text/javascript",
    },
  });
};
