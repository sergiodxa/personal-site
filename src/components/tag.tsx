export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <small className="bg-yellow-500 hover:bg-black text-black hover:text-yellow-500 py-1 px-3 mr-2 my-1 leading-none text-xs rounded cursor-default">
      {children}
    </small>
  );
}
