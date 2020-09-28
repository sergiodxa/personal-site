import { useQuery } from "react-query";
import { Note } from "collected-notes";

type SearchOutput = Note[];

type SearchInput = { term: string; page?: number };

async function search(
  _key: string,
  { term, page }: SearchInput
): Promise<SearchOutput> {
  const res = await fetch(`/api/search?page=${page}&term=${term}`);
  if (!res.ok) throw new Error(res.statusText);
  const data: SearchOutput = await res.json();
  return data;
}

export function useSearch(term: string, page: number = 1) {
  return useQuery<SearchOutput, Error>(["search", { term, page }], search);
}
