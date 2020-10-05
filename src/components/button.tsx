import * as React from "react";
import clsx from "clsx";
import { QueryStatus } from "react-query";
import { Spinner } from "components/spinner";

type SubmitButtonProps = {
  label: React.ReactNode;
  behave?: "submit";
  status?: QueryStatus;
};

// type BasicButtonProps = {
//   label: React.ReactNode;
//   behave: "button";
//   onClick: React.MouseEventHandler<HTMLButtonElement>;
// };

export type ButtonProps = SubmitButtonProps;

export function Button(props: ButtonProps) {
  return (
    <button
      className={clsx(
        "border  py-3 px-10 text-md rounded-lg font-semibold select-none flex-shrink-0 leading-none transition-colors ease-in-out duration-200",
        {
          "bg-black text-white border-black hover:bg-white hover:text-black":
            props.status !== "loading",
          "bg-gray-200 text-black border-gray-300": props.status === "loading",
        }
      )}
      type={props.behave}
    >
      {props.status === "loading" ? <Spinner /> : null}
      {props.status !== "loading" ? props.label : null}
    </button>
  );
}
