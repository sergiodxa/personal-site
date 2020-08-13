import { NextApiRequest } from "next";
import { resolve } from "url";
import { Note } from "collected-notes";

type NoteUpdatedEvent = { type: "note-updated"; data: { note: Note } };
type NoteCreatedEvent = { type: "note-created"; data: { note: Note } };
type NoteEvent = NoteUpdatedEvent | NoteCreatedEvent;

const URL = process.env.VERCEL_URL || "localhost:3000";

export default function webhookCollectedNotes(req: NextApiRequest) {
  const event = req.body as NoteEvent;
  if (event.type === "note-updated" || "note-created") {
    return fetch(resolve(URL, `/articles/${event.data.note.path}`));
  }
}
