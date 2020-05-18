import clsx from "clsx";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const cn = clsx(
    "w-full py-2 pl-4 pr-12 border rounded-lg",
    "focus:outline-none focus:shadow-outline focus:border-transparent",
    "bg-black border-yellow-100 text-yellow-500 placeholder-yellow-200",
    "light:bg-white light:border-indigo-500 light:text-indigo-900 light:placeholder-indigo-200",
    props.className
  );
  return <input {...props} className={cn} />;
}
