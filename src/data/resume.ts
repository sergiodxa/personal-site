import useSWR from "swr";
import fetcher from "utils/fetcher";

export default function useResume(initialData = {}) {
  return useSWR("/api/resume", fetcher, { initialData });
}
