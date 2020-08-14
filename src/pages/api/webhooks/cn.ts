import { NextApiRequest, NextApiResponse } from "next";
import { format } from "url";
import { Note } from "collected-notes";

type NoteUpdatedEvent = { event: "note-updated"; data: { note: Note } };
type NoteCreatedEvent = { event: "note-created"; data: { note: Note } };
type NoteEvent = NoteUpdatedEvent | NoteCreatedEvent;

const host = process.env.VERCEL_URL || "localhost:3000";

export default async function webhookCollectedNotes(
  req: NextApiRequest,
  res: NextApiResponse<"">
) {
  console.log(process.env);
  const { event, data } = req.body as NoteEvent;
  console.log(event);
  if (event === "note-updated" || event === "note-created") {
    const url = format({
      host,
      pathname: `/articles/${data.note.path}`,
      protocol: host === "localhost:3000" ? "http" : "https",
    });
    console.log(url);
    try {
      await fetch(url);
    } catch (error) {
      console.error(error);
    }
  }
  res.send("");
}
