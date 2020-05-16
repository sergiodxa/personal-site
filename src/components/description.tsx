export default function Description({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-md md:text-lg tracking-wide border-l-4 border-yellow-500 light:border-indigo-500 pl-4 -ml-4 leading-none">
      {children}
    </p>
  );
}
