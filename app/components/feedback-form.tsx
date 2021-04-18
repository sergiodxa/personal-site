import { FormEvent, useState } from "react";
import { QueryStatus } from "react-query";
import { useSubmitFeedback } from "../mutations/use-submit-feedback";
import { Button } from "./button";
import { Input, Textarea } from "./input";
import { Spacer } from "./spacer";

type FeedbackFormProps = { path: string; initialValue?: string };

export function FeedbackForm({ path, initialValue = "" }: FeedbackFormProps) {
  // states
  const [message, setMessage] = useState(initialValue);
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  // mutations
  const [submitFeedback, { status, reset }] = useSubmitFeedback();
  // callbacks
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFeedback(
      { message, email, twitter, path },
      {
        onSuccess() {
          setMessage("");
        },
      }
    );
  }
  // render
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start space-y-4 bg-gray-100 dark:bg-gray-900 p-6 rounded-md"
    >
      <h3 className="text-xl font-semibold">
        Do you have feedback or comments?
      </h3>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          What should I know? Was something I said wrong or outdated? Let me
          know so I can fix it. Do you have some opinion about this topic? Let's start a discussion!
        </label>

        <Textarea
          status={status}
          label=""
          placeholder="What should I know?"
          onChange={(event) => {
            setMessage(event.target.value);
            if (event.target.value.trim() === "") reset();
          }}
          value={message}
          name="message"
          id="message"
          required
        />
      </div>

      {message.trim().length > 0 ? (
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
          <div className="space-y-px">
            <label className="text-gray-700 dark:text-gray-300" htmlFor="email">
              Email (optional)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="name"
              placeholder="your@email.com"
              id="email"
            />
          </div>
          <div className="space-y-px">
            <label
              className="text-gray-700 dark:text-gray-300"
              htmlFor="twitter"
            >
              Twitter handle (optional)
            </label>
            <Input
              type="text"
              value={twitter}
              onChange={(event) => setTwitter(event.target.value)}
              name="twitter"
              placeholder="@sergiodxa"
              id="twitter"
            />
          </div>
        </div>
      ) : null}

      <footer className="flex sm:items-center flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
        {message.trim().length > 0 && status === QueryStatus.Idle ? (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Feel free to expand as much as you need. You can use Markdown and
            multiline!
          </p>
        ) : null}

        <Spacer />

        {status === QueryStatus.Loading ? (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Sending your feedback
          </p>
        ) : null}
        {status === QueryStatus.Success ? (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Feedback sent!
          </p>
        ) : null}
        {status === QueryStatus.Error ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            Something went wrong! Try contacting me on{" "}
            <a className="underline" href="https://twitter.com/sergiodxa">
              Twitter
            </a>
          </p>
        ) : null}

        <Button label="Send feedback" status={status} />
      </footer>
    </form>
  );
}
