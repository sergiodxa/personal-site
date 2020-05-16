import clsx from "clsx";

export default function Description({
  children,
  border = true,
}: {
  children: React.ReactNode;
  border?: boolean;
}) {
  const cn = clsx(
    "text-md md:text-lg tracking-wide border-yellow-500 light:border-indigo-500 pl-4 -ml-4 leading-none",
    { "border-l-4": border }
  );
  return <p className={cn}>{children}</p>;
}
