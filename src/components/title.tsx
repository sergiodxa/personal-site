export default function Title({ children }: { children: React.ReactNode}) {
  return <h1 className="font-semibold text-2xl md:text-4xl tracking-widest leading-none light:text-indigo-500">{children}</h1>
}
