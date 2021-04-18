import { useQuery } from "react-query";
import { SearchResults } from "../types";

type SearchInput = { term: string; page?: number };

type useSearchParams = SearchInput & {
  initialData: SearchResults;
};

async function search(
  _key: string,
  { term, page }: SearchInput
): Promise<SearchResults> {
  const res = await fetch(`/api/search?page=${page}&term=${term}`);
  if (!res.ok) throw new Error(res.statusText);
  const data: SearchResults = await res.json();
  return data;
}

export function useSearch({ term, page = 1, initialData }: useSearchParams) {
  return useQuery<SearchResults, Error>(["search", { term, page }], search, {
    initialData,
    initialStale: true,
    enabled: term !== "",
  });
}
