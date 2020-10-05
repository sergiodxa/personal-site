import * as React from "react";
import { useSubmitQuestion } from "mutations/use-submit-question";
import { Spacer } from "components/spacer";
import { Button } from "components/button";
import { Textarea } from "components/input";
import { QueryStatus } from "react-query";

type AMAFormProps = {
  initialValue?: string;
  onChange?(value: string): void;
};

const noop = () => {};

export function AMAForm({ initialValue = "", onChange = noop }: AMAFormProps) {
  // states
  const [question, setQuestion] = React.useState(initialValue);
  // mutations
  const [submitQuestion, { status, reset }] = useSubmitQuestion();
  // callbacks
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(
      { question },
      {
        onSuccess() {
          setQuestion("");
        },
      }
    );
  }
  // effects
  React.useEffect(
    function resetMutationOnClearInput() {
      if (onChange) onChange(question);
      if (question === "") reset();
    },
    [question, onChange]
  );
  // render
  return (
    <>
      <header id="ama">
        <h2 className="font-semibold text-2xl">Ask me Anything!</h2>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start space-y-2"
      >
        <label htmlFor="ama" className="text-gray-600 text-lg">
          Is there something you have always wanted me to write about? Ask about
          it here and I will try to write about that topic
        </label>

        <Textarea
          placeholder="How can I..."
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          status={status}
        />

        <footer className="flex items-baseline w-full space-x-2">
          {question.trim().length > 0 && status === QueryStatus.Idle ? (
            <p className="text-sm text-gray-700">
              Feel free to expand as much as you need. You can use Markdown and
              multiline!
            </p>
          ) : null}

          <Spacer />

          {status === QueryStatus.Loading ? (
            <p className="text-sm text-gray-700">Sending your question</p>
          ) : null}
          {status === QueryStatus.Success ? (
            <p className="text-sm text-gray-700">Question sent!</p>
          ) : null}
          {status === QueryStatus.Error ? (
            <p className="text-sm text-red-600">
              Something went wrong! Try asking me on{" "}
              <a className="underline" href="https://twitter.com/sergiodxa">
                Twitter
              </a>
            </p>
          ) : null}

          <Button label="Send Question" status={status} />
        </footer>
      </form>
    </>
  );
}
