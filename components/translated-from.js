import { black, grey } from "@sergiodxa/palette";
import { A } from "@sergiodxa/ui/lib/text";

function TranslatedFrom({ url, lang, title }) {
  return (
    <div>
      Translated from{" "}
      <A href={url} target="_blank" rel="canonical" color={black}>
        <strong lang={lang}>{title}</strong>
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

export default TranslatedFrom;
