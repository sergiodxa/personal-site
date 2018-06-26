import { black, grey } from "@sergiodxa/palette";
import { A } from "@sergiodxa/ui/lib/text";

import parseUrl from "../lib/parse-url";

function hostname(url) {
  return url ? parseUrl(url).hostname : "";
}

function CanonicalURL({ value }) {
  return (
    <div>
      Originally published at{" "}
      <A href={value} target="_blank" rel="canonical" color={black}>
        <strong>{hostname(value)}</strong>
      </A>
      <style jsx>{`
        div {
          border: 1px solid ${grey};
          padding: 0.75em;
          margin: 0.75em;
        }
      `}</style>
    </div>
  );
}

export default CanonicalURL;
