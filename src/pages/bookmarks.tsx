import { GetStaticProps } from "next";
import { getBookmarks } from "utils/get-bookmarks";
import { BookmarksPageProps } from "types";
import { BookmarksLayout } from "layouts/bookmarks";

export const getStaticProps: GetStaticProps<BookmarksPageProps> = async () => {
  const bookmarks = await getBookmarks();
  return { props: { bookmarks }, revalidate: 5 };
};

export default BookmarksLayout;
