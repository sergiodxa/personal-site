import useSWR from "swr";
import fetcher from "utils/fetcher";

export default function useArticle(slug: string[], initialData: string = "") {
  return useSWR(`/api/articles/${slug.join("/")}`, fetcher, { initialData });
}
