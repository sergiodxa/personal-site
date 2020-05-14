import useSWR from "swr";
import fetcher from "utils/fetcher";

export default function useLinks(initialData = {}) {
  return useSWR("/api/links", fetcher, { initialData });
}
