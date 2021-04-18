import { usePendingFormSubmit } from "@remix-run/react";
import { Button } from "./button";
import { Spacer } from "./spacer";

type Props = {
  success?: string;
  error?: string;
}

export function AMAForm({ success, error}: Props) {
  const pendingForm = usePendingFormSubmit();
  return (
    <>
      <header id="ama">
        <h2 className="font-semibold text-2xl">Ask me Anything!</h2>
      </header>

      <form method="post" className="flex flex-col items-start space-y-2">
        <label
          htmlFor="question"
          className="text-gray-600 dark:text-gray-400 text-lg"
        >
          Is there something you have always wanted me to write about? Ask about
          it here and I will try to write about that topic
        </label>

        <textarea
          id="question"
          name="question"
          placeholder="How can I..."
          className="bg-white text-black font-semibold border-2 border-gray-900 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
          rows={1}
          minLength={1}
          required
          aria-multiline
        />

        <footer className="flex items-baseline w-full space-x-2">
          <Spacer />

          {pendingForm ? (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Sending your question...
            </p>
          ) : null}
          {success ? (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Question sent!
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400">
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