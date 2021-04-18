import { useMutation } from "react-query";
import { Feedback } from "../types";

type Input = Feedback;

async function submitFeedback(input: Input): Promise<void> {
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const { status, error } = await res.json();
  if (status === "failure") {
    throw new Error(error);
  }
}

export function useSubmitFeedback() {
  return useMutation<void, Error, Input, never>(submitFeedback);
}
