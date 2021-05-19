import { collectedNotes } from "collected-notes";

if (!process.env.CN_EMAIL) throw new Error("Missing CN_EMAIL env variable");

if (!process.env.CN_TOKEN) throw new Error("Missing CN_TOKEN env variable");

if (!process.env.CN_SITE_PATH) {
  throw new Error("Missing CN_SITE_PATH env variable");
}

export let cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export let sitePath = process.env.CN_SITE_PATH;
