import { A, P } from "@sergiodxa/ui/lib/text";

import { dark } from "@sergiodxa/palette";

export function After({ copy }) {
  return (
    <div>
      <P>
        ¿Te gustó este artículo?
        <br />
        <A href="https://sdx.im/patreon" color={dark} decoration="underline">
          ¡Conviértete Patreon y obtén acceso antes que nadie junto a más
          beneficios!
        </A>
      </P>
      <style jsx>{`
        div {
          text-align: center;
          margin: 2em 0;
          padding: 0 2em;
          max-width: 80%;
        }
      `}</style>
    </div>
  );
}

export const Before = () => (
  <div>
    <P>
      ¿Te gustan estos artículos?
      <br />
      <A href="https://sdx.im/patreon" color={dark} decoration="underline">
        ¡Apoyame en Patreon para que pueda escribir muchos más!
      </A>
    </P>
    <style jsx>{`
      div {
        text-align: center;
        margin: 2em 0;
        max-width: 100%;
      }
    `}</style>
  </div>
);
