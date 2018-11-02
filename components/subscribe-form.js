import { P } from "@sergiodxa/ui/lib/text";

import { grey, dark, light, success } from "@sergiodxa/palette";

function SubscribeForm({ copy }) {
  return (
    <form
      action="https://tinyletter.com/sergiodxa"
      method="POST"
      target="popupwindow"
    >
      <label htmlFor="email">
        <P>
          {copy}
          <br />
          Subscribe below and keep updated.
        </P>
      </label>

      <input
        id="tlemail"
        type="email"
        required
        name="email"
        placeholder="your@email.com"
      />

      <style jsx>{`
        form {
          margin: 2em auto;
          text-align: center;
          width: 80%;
        }

        input {
          border: none;
          border-bottom: 2px solid ${grey};
          box-sizing: border-box;
          border-radius: 0;
          display: block;
          font-size: 1em;
          margin: 1em auto;
          outline: none;
          text-align: center;
          transition: all 0.3s;
          padding: 0.5em;
          width: 100%;
        }

        input:hover {
          background-color: white;
          border-bottom-color: ${dark};
        }

        input:disabled {
          background-color: ${grey};
          color: ${light};
        }

        :global(.success) {
          color: ${success};
        }

        @media (min-width: 720px) {
          input {
            width: 62.5%;
          }
        }
      `}</style>
    </form>
  );
}

export default SubscribeForm;
