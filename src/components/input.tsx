import * as React from "react";
import { QueryStatus } from "react-query";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  status?: QueryStatus;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  status?: QueryStatus;
};

export function Textarea({
  value,
  status,
  label,
  ...props
}: TextareaProps) {
  // refs
  const $textarea = React.useRef<HTMLTextAreaElement>();
  // effects
  React.useEffect(
    function autosizeTextarea() {
      if (!$textarea?.current) return;
      $textarea.current.style.height = "0px";
      const newHeight = Math.max($textarea.current.scrollHeight, 48);
      $textarea.current.style.height = newHeight + "px";
    },
    [$textarea, value]
  );
  // render
  return (
    <textarea
      {...props}
      ref={$textarea}
      className="bg-white text-black font-semibold border-2 border-gray-900 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
      rows={1}
      minLength={1}
      value={value}
      disabled={status === "loading"}
      aria-required={props.required}
      aria-multiline
      aria-disabled={status === "loading"}
      aria-label={label}
    />
  );
}

export function Input({ status, label, ...props }: InputProps) {
  return (
    <input
      {...props}
      className="bg-white text-black font-semibold border-2 border-gray-900 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
      minLength={3}
      disabled={status === "loading"}
      aria-required={props.required}
      aria-multiline
      aria-disabled={status === "loading"}
      aria-label={label}
    />
  );
}
