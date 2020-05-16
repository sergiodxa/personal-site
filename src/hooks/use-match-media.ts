import { useState, useCallback } from "react";
import { useSSRLayoutEffect } from "hooks/use-ssr-layout-effect";

function formatQuery(mediaQuery: string): string {
  let query = mediaQuery;
  if (!query.startsWith("(")) {
    query = `(${query}`;
  }
  if (!query.endsWith(")")) {
    query = `${query})`;
  }
  return query;
}

export function useMatchMedia(
  mediaQuery: string,
  defaultMatch: boolean,
): boolean {
  const query = formatQuery(mediaQuery);
  const [match, setMatch] = useState(defaultMatch);
  const handler = useCallback((): void => {
    setMatch(window.matchMedia(query).matches);
  }, [query]);

  useSSRLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    if (match !== matchMedia.matches) setMatch(matchMedia.matches);
    matchMedia.addListener(handler);
    return (): void => {
      matchMedia.removeListener(handler);
    };
  }, [query, handler]);

  return match;
}
