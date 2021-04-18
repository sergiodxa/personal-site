import clsx from "clsx";
import { ReactNode } from "react";
import { QueryStatus } from "react-query";
import { Spinner } from "./spinner";

type SubmitButtonProps = {
  label: ReactNode;
  behave?: "submit";
  status?: QueryStatus;
};

// type BasicButtonProps = {
//   label: ReactNode;
//   behave: "button";
//   onClick: MouseEventHandler<HTMLButtonElement>;
// };

export type ButtonProps = SubmitButtonProps;

export function Button(props: ButtonProps) {
  return (
    <button
      className={clsx(
        "border  py-3 px-10 text-md rounded-lg font-semibold select-none flex-shrink-0 leading-none transition-colors ease-in-out duration-200",
        {
          "bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 border-gray-900 dark:border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100":
            props.status !== QueryStatus.Loading,
          "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 text-center":
            props.status === QueryStatus.Loading,
        }
      )}
      type={props.behave}
    >
      {props.status === QueryStatus.Loading ? (
        <Spinner className="inline" />
      ) : (
        props.label
      )}
    </button>
  );
}
