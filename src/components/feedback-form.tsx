import * as React from "react";
import { QueryStatus } from "react-query";
import { useSubmitFeedback } from "mutations/use-submit-feedback";
import { Textarea, Input } from "./input";
import { Spacer } from "./spacer";
import { Button } from "./button";

type FeedbackFormProps = { initialValue?: string };

export function FeedbackForm({ initialValue = "" }: FeedbackFormProps) {
  // states
  const [message, setMessage] = React.useState(initialValue);
  const [email, setEmail] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  // mutations
  const [submitFeedback, { status, reset }] = useSubmitFeedback();
  // callbacks
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFeedback(
      { message, email, twitter },
      {
        onSuccess() {
          setMessage("");
        },
      }
    );
  }
  // effects
  console.log(status);
  // render
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start space-y-4 bg-gray-900 p-6 rounded-md"
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
          know so I can fix it.
          <br />
          Do you have some opinion about this topic? Let's start a discussion!
        </label>

        <Textarea
          status={status}
          label=""
          placeholder="What should I know?"
          onChange={(event) => {
            setMessage(event.target.value)
            if (event.target.value.trim() === "") reset();
          }}
          value={message}
          name="message"
          id="message"
          required
        />
      </div>

      {message.trim().length > 0 ? (
        <div className="flex space-x-2 w-full">
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

      <footer className="flex items-baseline w-full space-x-2">
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
