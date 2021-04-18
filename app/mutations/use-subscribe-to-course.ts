import { useMutation } from "react-query";
import { Courses } from "../types";

type Input = { email: string; course: Courses };

type Failure = { message: string; code: string }

async function subscribeToCourse(input: Input): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const { status, error, code } = await res.json();
  if (status === "failure") {
    throw { message: error, code } as Failure;
  }
}

export function useSubscribeToCourse() {
  return useMutation<void, Failure, Input, never>(subscribeToCourse);
}
