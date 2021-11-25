/* eslint-disable testing-library/render-result-naming-convention */
import "dotenv/config";
import etag from "etag";
import { renderToString } from "react-dom/server";
import type { EntryContext, HandleDataRequestFunction } from "remix";
import { RemixServer } from "remix";
import { notModified } from "remix-utils";

export default function handleRequest(
  request: Request,
  status: number,
  headers: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  headers.set("Content-Type", "text/html");
  headers.set("ETag", etag(markup));

  if (request.headers.get("If-None-Match") === headers.get("ETag")) {
    return notModified({ headers });
  }

  return new Response("<!DOCTYPE html>" + markup, { status, headers });
}

export let handleDataRequest: HandleDataRequestFunction = async (
  response: Response,
  { request }
) => {
  let body = await response.text();

  if (request.method.toLowerCase() === "get") {
    response.headers.set("etag", etag(body));
    if (request.headers.get("If-None-Match") === response.headers.get("ETag")) {
      return notModified({ headers: response.headers });
    }
  }

  return response;
};
