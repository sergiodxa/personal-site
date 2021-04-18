import { useMutation } from "react-query";

type Input = { question: string };

async function submitQuestion(input: Input): Promise<void> {
  const res = await fetch("/api/ama", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: input.question }),
  });
  const { status, error } = await res.json();
  if (status === "failure") {
    throw new Error(error);
  }
}

export function useSubmitQuestion() {
  return useMutation<void, Error, Input, never>(submitQuestion);
}
