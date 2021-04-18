import { InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef } from "react";
import { QueryStatus } from "react-query";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  status?: QueryStatus;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  status?: QueryStatus;
};

export function Textarea({
  label,
  ...props
}: TextareaProps) {
  // render
  return (
    <textarea
      {...props}
      className="bg-white text-black font-semibold border-2 border-gray-900 w-full p-2 text-lg focus:border-blue-500 focus:outline-none resize-none rounded-lg placeholder-gray-500"
      rows={1}
      minLength={1}
      aria-required={props.required}
      aria-multiline
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
