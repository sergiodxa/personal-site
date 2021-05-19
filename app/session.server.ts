import { createCookieSessionStorage } from "remix";
import { env } from "./utils";

export let { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__web_session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: ["s3cr3t"],
      secure: env("production"),
      domain: env("production") ? "sergiodxa.com" : undefined,
    },
  });
