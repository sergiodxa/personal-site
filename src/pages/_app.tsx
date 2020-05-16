import { AnimatePresence } from "framer-motion";
import Navigation from "components/navigation";
import "../styles.css";

export default function BlogApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </>
  );
}
