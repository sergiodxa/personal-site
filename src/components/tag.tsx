import clsx from "clsx";

export default function Tag({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const cn = clsx(
    "py-1 px-3 mr-2 my-1 leading-none text-xs rounded cursor-default",
    {
      "text-yellow-500 bg-black": active,
      "light:text-indigo-100 light:bg-indigo-900": active,

      "text-black bg-yellow-500 hover:text-yellow-500 hover:bg-black": !active,
      "light:text-indigo-100 light:bg-indigo-500 light:hover:text-indigo-100 light:hover:bg-indigo-900": !active,
    }
  );
  return <small className={cn}>{children}</small>;
}
