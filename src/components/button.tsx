import * as React from "react";

type BaseProps = { label: React.ReactNode; behave?: "submit" | "button" };

type SubmitButtonProps = {
  behave: "submit";
} & BaseProps;

type BasicButtonProps = {
  behave: "button";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & BaseProps;

export type ButtonProps = SubmitButtonProps | BasicButtonProps;

export function Button(props: ButtonProps) {
  return (
    <button
      className="bg-black text-white border border-black py-3 px-10 text-md rounded-lg font-semibold select-none flex-shrink-0 leading-none hover:bg-white hover:text-black transition-colors ease-in-out duration-200"
      type={props.behave}
    >
      {props.label}
    </button>
  );
}
