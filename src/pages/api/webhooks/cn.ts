import { NextApiRequest, NextApiResponse } from "next";
import { format } from "url";
import { Note } from "collected-notes";

type NoteUpdatedEvent = { event: "note-updated"; data: { note: Note } };
type NoteCreatedEvent = { event: "note-created"; data: { note: Note } };
type NoteDeletedEvent = { event: "note-deleted"; data: { note: Note } };
type NoteEvent = NoteUpdatedEvent | NoteCreatedEvent | NoteDeletedEvent;

const host = "sergiodxa.com";
const protocol = "https";

async function regenerateNote({ event, data }: NoteEvent) {
  if (event !== "note-updated" && event !== "note-created") return;

  const url = format({
    host,
    protocol,
    pathname: `/articles/${data.note.path}`,
  });

  try {
    await fetch(url);
  } catch (error) {
    console.error(error);
  }
}

async function regenerateList({ event }: NoteEvent) {
  if (event !== "note-created" && event !== "note-deleted") return;

  const url = format({ host, protocol, pathname: `/articles` });

  try {
    await fetch(url);
  } catch (error) {
    console.error(error);
  }
}

export default async function webhookCollectedNotes(
  req: NextApiRequest,
  res: NextApiResponse<"">
) {
  const { event, data } = req.body as NoteEvent;

  await Promise.all([
    regenerateNote({ event, data }),
    regenerateList({ event, data }),
  ]);

  res.send("");
}
