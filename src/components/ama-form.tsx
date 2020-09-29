import * as React from "react";
import { useSubmitQuestion } from "mutations/use-submit-question";
import { Spacer } from "components/spacer";
import { Button } from "components/button";

type AMAFormProps = {
  initialValue?: string;
  onChange?(value: string): void;
};

const noop = () => {};

export function AMAForm({ initialValue = "", onChange = noop }: AMAFormProps) {
  // refs
  const $textarea = React.useRef<HTMLTextAreaElement>();
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
    function autosizeTextarea() {
      if ($textarea?.current) {
        $textarea.current.style.height = "0px";
        const newHeight = Math.max($textarea.current.scrollHeight, 47);
        $textarea.current.style.height = newHeight + "px";
      }
    },
    [$textarea, question]
  );
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

        <textarea
          ref={$textarea}
          className="bg-white text-black font-semibold border-2 border-gray-900 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
          rows={1}
          id="ama"
          minLength={1}
          placeholder="How can I..."
          required
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          disabled={status === "loading"}
          aria-required
          aria-multiline
          aria-disabled={status === "loading"}
        />

        <footer className="flex items-baseline w-full space-x-2">
          {question.trim().length > 0 && status === "idle" ? (
            <p className="text-sm text-gray-700">
              Feel free to expand as much as you need. You can use Markdown and
              multiline!
            </p>
          ) : null}

          <Spacer />

          {status === "loading" ? (
            <p className="text-sm text-gray-700">Sending your question</p>
          ) : null}
          {status === "success" ? (
            <p className="text-sm text-gray-700">Question sent!</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-gray-700">
              Something went wrong! Try asking me on{" "}
              <a className="underline" href="https://twitter.com/sergiodxa">
                Twitter
              </a>
            </p>
          ) : null}

          <Button label="Send Question" />
        </footer>
      </form>
    </>
  );
}
