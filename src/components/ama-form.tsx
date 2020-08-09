import * as React from "react";
import { useSubmitQuestion } from "mutations/use-submit-question";
import { Spacer } from "./spacer";
import { MemojiName } from "./memoji";

const noop = () => {};

export function AMAForm({
  setMemoji,
  initialValue = "",
  onChange = noop,
  initialMemoji = "happy",
}: {
  setMemoji?(name: MemojiName): void;
  initialValue?: string;
  onChange?(value: string): void;
  initialMemoji?: MemojiName;
}) {
  // refs
  const $textarea = React.useRef<HTMLTextAreaElement>();
  // states
  const [question, setQuestion] = React.useState(initialValue);
  // mutations
  const [submitQuestion, { status, reset }] = useSubmitQuestion();
  // callbacks
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    submitQuestion(
      { question },
      {
        onSuccess() {
          target.reset();
        },
      }
    );
  }
  // effects
  React.useEffect(() => {
    if ($textarea?.current) {
      $textarea.current.style.height = "0px";
      const newHeight = Math.max($textarea.current.scrollHeight, 51);
      $textarea.current.style.height = newHeight + "px";
    }
  }, [$textarea, question]);
  React.useEffect(() => {
    if (!setMemoji) return;
    if (status === "running") setMemoji("luck");
    if (status === "success") setMemoji("congrats");
    if (status === "failure") setMemoji("sad");
  }, [status, setMemoji]);
  React.useEffect(() => {
    onChange(question);
    if (question.length === 0) {
      reset();
      setMemoji(initialMemoji);
    }
    if (question.length >= 1) setMemoji("thinking");
    if (question.length >= 50) setMemoji("open-mouth");
    if (question.length >= 75) setMemoji("amazing");
    if (question.length >= 280) setMemoji("mind-blown");
  }, [question]);
  // render
  return (
    <>
      <header id="ama">
        <h2 className="font-semibold">Ask me Anything!</h2>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start space-y-2"
      >
        <label htmlFor="ama" className="text-gray-600 text-sm">
          I will try to write an article about what you asked.
        </label>

        <textarea
          ref={$textarea}
          className="bg-black border-2 border-gray-900 w-full p-2 text-sm focus:outline-none focus:border-blue-500 focus:bg-gray-900 text-gray-100 resize-none rounded placeholder-gray-700 focus:placeholder-gray-400"
          rows={1}
          id="ama"
          minLength={1}
          placeholder="How can I..."
          required
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          disabled={status === "running"}
          aria-required
          aria-multiline
          aria-disabled={status === "running"}
        />

        <footer className="flex items-baseline w-full space-x-2">
          {question.trim().length > 0 && status === "idle" ? (
            <p className="text-xs text-gray-400">
              Pst! You can use Markdown and multiple lines here 😉
            </p>
          ) : null}

          <Spacer />

          {status === "running" ? (
            <p className="text-xs text-gray-500">Sending your question</p>
          ) : null}
          {status === "success" ? (
            <p className="text-xs text-gray-500">Question sent!</p>
          ) : null}
          {status === "failure" ? (
            <p className="text-xs text-gray-500">
              Something went wrong! Try asking me on{" "}
              <a className="underline" href="https://twitter.com/sergiodxa">
                Twitter
              </a>
            </p>
          ) : null}

          <button
            className="bg-orange-400 text-black py-1 px-8 text-xs rounded-full font-semibold select-none flex-shrink-0"
            style={{
              background: "linear-gradient(45deg, #ED8936, #F6E05E)",
            }}
          >
            Send Question
          </button>
        </footer>
      </form>
    </>
  );
}
