import * as React from "react";
import { Navigation } from "components/navigation";
import { Container } from "components/container";
import { Button } from "components/button";
import { Input } from "components/input";
import { useSubscribeToCourse } from "mutations/use-subscribe-to-course";
import { QueryStatus } from "react-query";

const logoSWR = (
  <>
    <style>
      {`
      path {
        // fill: url(#logo-gradient)
      }
    `}
    </style>
    <path
      d="M0 36.53c.07 17.6 14.4 32.01 32.01 32.01a32.05 32.05 0 0032.01-32V32a13.2 13.2 0 0123.4-8.31h20.7A32.07 32.07 0 0077.2 0a32.05 32.05 0 00-32 32.01v4.52A13.2 13.2 0 0132 49.71a13.2 13.2 0 01-13.18-13.18 3.77 3.77 0 00-3.77-3.77H3.76A3.77 3.77 0 000 36.53zM122.49 68.54a32.14 32.14 0 01-30.89-23.7h20.67a13.16 13.16 0 0023.4-8.3V32A32.05 32.05 0 01167.68 0c17.43 0 31.64 14 32 31.33l.1 5.2a13.2 13.2 0 0023.4 8.31h20.7a32.07 32.07 0 01-30.91 23.7c-17.61 0-31.94-14.42-32.01-32l-.1-4.7v-.2a13.2 13.2 0 00-13.18-12.81 13.2 13.2 0 00-13.18 13.18v4.52a32.05 32.05 0 01-32.01 32.01zM247.94 23.7a13.16 13.16 0 0123.4 8.31 3.77 3.77 0 003.77 3.77h11.3a3.77 3.77 0 003.76-3.77A32.05 32.05 0 00258.16 0a32.07 32.07 0 00-30.92 23.7h20.7z"
      fill="currentColor"
    />
    <defs>
      <linearGradient id="logo-gradient">
        <stop offset="0%" stopColor="#31c48d" />
        <stop offset="50%" stopColor="#6875f5" />
        <stop offset="100%" stopColor="#6875f5" />
      </linearGradient>
    </defs>
  </>
);

function ErrorMessage({ code, message }) {
  if (code === "disposable") {
    return (
      <>
        Si usas un email descartable no voy a poder contactarte cuando esté el
        curso.
      </>
    );
  }
  if (code === "yup") return <>{message}</>;
  return (
    <>
      Something went wrong! Try contacting me on{" "}
      <a className="underline" href="https://twitter.com/sergiodxa">
        Twitter
      </a>
    </>
  );
}

function Subscribe() {
  const [email, setEmail] = React.useState("hello@sergiodxa.com");

  const [subscribe, { status, error }] = useSubscribeToCourse();

  const handleSubmit = React.useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(function handleSubmit(event) {
    event.preventDefault();
    subscribe(
      { email, course: "swr" },
      {
        onSuccess() {
          setEmail("");
        },
      }
    );
  }, []);

  return (
    <form
      className="flex flex-col space-y-2 border-2 border-black rounded-lg p-8 shadow-md"
      onSubmit={handleSubmit}
    >
      <label className="text-lg">
        ¡Se el primero en enterarte cuando salga!
        {/* Dejame tu email para obtener las{" "} <strong>dos primeras clases totalmente gratis</strong>. */}
      </label>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:items-center">
        <Input
          type="email"
          label="Ingresa tu email"
          placeholder="Ingresa tu email"
          value={email}
          status={status}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button label="Suscribirse" status={status} />
      </div>

      {status === QueryStatus.Loading ? (
        <p className="text-sm text-gray-700">
          Estoy guardándo tu email, espera un poco 🙏
        </p>
      ) : null}

      {status === QueryStatus.Success ? (
        <p className="text-sm text-gray-700">
          Listo! En cuanto tenga noticias te voy a mandar un email
        </p>
      ) : null}

      {status === QueryStatus.Error ? (
        <p className="text-sm text-red-600">
          <ErrorMessage message={error.message} code={error.code} />
        </p>
      ) : null}
    </form>
  );
}

export function SWRLandingLayout() {
  return (
    <section className="mb-12">
      <section>
        <Container>
          <Navigation
            current="SWR"
            title="Data-Fetching con React & SWR"
            description="Aprende a usar SWR para optimizar la forma en que hacés
            data-fetching en tus aplicaciones de React."
            path="/courses/swr"
          />

          <div className="space-y-20 max-w-prose mx-auto">
            <div className="mt-10 space-y-4 sm:space-y-8 text-center items-center justify-between w-full">
              <svg viewBox="0 0 291 69" fill="none" className="h-10 inline">
                {logoSWR}
              </svg>

              <header className="max-w-prose mx-auto">
                <p className="text-xl text-gray-500 font-bold uppercase">
                  Aprende
                </p>
                <h1 className="leading-none tracking-tight text-3xl sm:text-4xl md:text-5xl font-black">
                  Data-Fetching
                  <br />
                  con React & SWR
                </h1>
                <p className="text-xl text-gray-500 font-semibold mt-8">
                  Aprende a usar SWR para optimizar la forma en que hacés
                  data-fetching en tus aplicaciones de React.
                </p>
              </header>
            </div>

            <Subscribe />
          </div>
        </Container>
      </section>
    </section>
  );
}
