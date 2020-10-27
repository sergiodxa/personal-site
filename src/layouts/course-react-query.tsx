import * as React from "react";
import { Navigation } from "components/navigation";
import { Container } from "components/container";
import { Button } from "components/button";
import { Input } from "components/input";
import { useSubscribeToCourse } from "mutations/use-subscribe-to-course";
import { QueryStatus } from "react-query";

const logoRQ = (
  <>
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <path
        d="M343.113 309.464l-10.665 18.519A18 18 0 01316.85 337h-81.7a18 18 0 01-15.598-9.017l-10.666-18.519h134.227zm29.857-51.843l-18.805 32.652H197.834l-18.804-32.652h193.94zm-18.114-50.696L373 238.431H179l18.144-31.506h157.712zM316.85 159a18 18 0 0115.598 9.017l11.356 19.717H208.196l11.356-19.717A18 18 0 01235.15 159h81.7z"
        fill="#00435B"
      />
      <path
        d="M116.245 150.407c-9.05-43.885-10.993-77.544-5.143-101.986 3.48-14.536 9.84-26.395 19.513-34.95C140.826 4.438 153.737.006 168.243.006c23.932 0 49.09 10.913 75.975 31.645 10.966 8.456 22.347 18.648 34.167 30.583a25.602 25.602 0 013.19-3.41c33.416-29.779 61.55-48.281 85.614-55.415 14.309-4.242 27.742-4.646 39.975-.53 12.913 4.346 23.202 13.33 30.462 25.912 11.98 20.765 15.14 48.05 10.673 81.742-1.82 13.732-4.933 28.691-9.33 44.9 1.658.2 3.321.568 4.968 1.113 42.399 14.05 72.422 29.16 90.599 46.428 10.814 10.274 17.876 21.711 20.43 34.372 2.694 13.364.066 26.768-7.184 39.34-11.958 20.736-33.945 37.09-65.269 50.043-12.577 5.201-26.808 9.912-42.707 14.148a25.608 25.608 0 011.664 5.203c9.05 43.885 10.993 77.544 5.143 101.985-3.48 14.537-9.84 26.395-19.513 34.95-10.211 9.033-23.122 13.466-37.628 13.466-23.932 0-49.09-10.913-75.975-31.645-11.082-8.546-22.59-18.866-34.545-30.965a25.49 25.49 0 01-4.526 5.305c-33.417 29.779-61.552 48.281-85.615 55.415-14.309 4.242-27.742 4.646-39.975.53-12.913-4.346-23.202-13.33-30.462-25.912-11.98-20.765-15.14-48.05-10.673-81.742 1.887-14.229 5.16-29.774 9.813-46.662a25.48 25.48 0 01-5.45-1.167c-42.4-14.05-72.423-29.16-90.6-46.428-10.814-10.274-17.876-21.711-20.43-34.372-2.694-13.364-.066-26.768 7.184-39.34 11.958-20.736 33.945-37.09 65.269-50.043 12.952-5.356 27.657-10.192 44.133-14.526a25.651 25.651 0 01-1.375-4.522z"
        fill="#002B3B"
        fillRule="nonzero"
      />
      <path
        d="M225.134 136.426c21.978-1.75 44.632-2.522 67.96-2.317a8 8 0 006.28-13.044C246.277 55.688 202.554 23 168.21 23c-35.458 0-45.574 39.086-30.347 117.258a8 8 0 009.248 6.348c27.11-4.804 53.117-8.198 78.024-10.18zM348.51 147.187c12.693 18.29 24.875 37.658 36.546 58.106a8 8 0 0014.423-1.116c30.036-78.781 36.348-133.112 18.938-162.993C400.45 10.35 361.303 21.011 300.975 73.17a8 8 0 00-.876 11.22c17.925 21.187 34.062 42.12 48.412 62.798zM401.783 257.248c-9.5 19.965-20.177 40.03-32.032 60.197a8 8 0 008.194 11.948c82.773-13.61 132.756-35.331 149.949-65.165 17.757-30.812-10.799-59.053-85.667-84.724a8 8 0 00-10.113 4.833c-9.447 25.964-19.557 50.268-30.331 72.91z"
        fill="#FF4154"
      />
      <path
        d="M343.134 462.426c21.978-1.75 44.632-2.522 67.96-2.317a8 8 0 006.28-13.044C364.277 381.688 320.554 349 286.21 349c-35.458 0-45.574 39.086-30.347 117.258a8 8 0 009.248 6.348c27.11-4.804 53.117-8.198 78.024-10.18z"
        fill="#FF4154"
        transform="rotate(-180 338.5 411.5)"
      />
      <path
        d="M207.49 350.813c-12.693-18.29-24.875-37.658-36.546-58.106a8 8 0 00-14.423 1.116c-30.036 78.781-36.348 133.112-18.938 162.993 17.967 30.834 57.114 20.173 117.442-31.985a8 8 0 00.876-11.22c-17.925-21.187-34.062-42.12-48.412-62.798zM154.217 237.752c9.5-19.965 20.177-40.03 32.032-60.197a8 8 0 00-8.194-11.948c-82.773 13.61-132.756 35.331-149.949 65.165-17.757 30.812 10.799 59.053 85.667 84.724a8 8 0 0010.113-4.833c9.447-25.964 19.557-50.268 30.331-72.91z"
        fill="#FF4154"
      />
      <path
        d="M66.718 0h68.579a28 28 0 0124.285 14.063l34.434 60a28 28 0 010 27.874l-34.434 60A28 28 0 01135.297 176h-68.58a28 28 0 01-24.284-14.063l-34.434-60a28 28 0 010-27.874l34.434-60A28 28 0 0166.718 0zm58.127 18.11a28 28 0 0124.292 14.075l24.012 41.89a28 28 0 010 27.85l-24.012 41.89a28 28 0 01-24.292 14.076H77.17a28 28 0 01-24.292-14.076l-24.012-41.89a28 28 0 010-27.85l24.012-41.89A28 28 0 0177.17 18.109h47.675zm-11.266 19.806H88.436a28 28 0 00-24.278 14.051L51.469 74.051a28 28 0 000 27.898l12.689 22.084a28 28 0 0024.278 14.05h25.143a28 28 0 0024.278-14.05l12.688-22.084a28 28 0 000-27.898l-12.688-22.084a28 28 0 00-24.278-14.05zm-10.848 18.959A28 28 0 01127 70.907l1.799 3.125a28 28 0 010 27.936l-1.8 3.125a28 28 0 01-24.267 14.032h-3.448a28 28 0 01-24.267-14.032l-1.799-3.125a28 28 0 010-27.936l1.799-3.125a28 28 0 0124.267-14.032h3.448zm-1.72 18.675c-4.457 0-8.569 2.373-10.795 6.225a12.442 12.442 0 000 12.45 12.458 12.458 0 0010.787 6.225c4.458 0 8.57-2.373 10.796-6.225a12.442 12.442 0 000-12.45 12.458 12.458 0 00-10.787-6.225zM0 88h22.416"
        transform="translate(175 160)"
        fill="#FFD94C"
      />
    </g>
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
  const [subscribe, { status, error }] = useSubscribeToCourse();

  const handleSubmit = React.useCallback<
    React.FormEventHandler<HTMLFormElement>
  >(function handleSubmit(event) {
    event.preventDefault();
    const $form = event.currentTarget;
    const formData = new FormData($form);
    const email = formData.get("email") as string;
    subscribe(
      { email, course: "react-query" },
      {
        onSuccess() {
          $form.reset();
        },
      }
    );
  }, []);

  return (
    <form
      className="flex flex-col space-y-2 border-2 border-black rounded-lg py-8 px-16 shadow-md"
      onSubmit={handleSubmit}
    >
      <label className="text-lg">
        ¡Se el primero en enterarte cuando salga!
        {/* Dejame tu email para obtener las{" "} <strong>dos primeras clases totalmente gratis</strong>. */}
      </label>

      <div className="flex flex-col space-y-2">
        <Input
          type="email"
          name="email"
          label="Ingresa tu email"
          placeholder="Ingresa tu email"
          status={status}
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

export function RQLandingLayout() {
  return (
    <section className="mb-12">
      <section>
        <Container>
          <Navigation
            current="SWR"
            title="Data-Fetching con React y SWR"
            description="Aprende a usar SWR para optimizar la forma en que hacés
            data-fetching en tus aplicaciones de React."
            path="/courses/swr"
          />

          <section className="space-y-10 max-w-prose mx-auto">
            <div className="mt-10 space-y-8 sm:space-y-16 text-center items-center justify-between w-full">
              <svg viewBox="0 0 556 498" className="h-24 mx-auto">
                {logoRQ}
              </svg>

              <header className="max-w-prose mx-auto">
                <p className="text-xl text-gray-500 font-bold uppercase">
                  Aprende
                </p>
                <h1 className="leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl font-black">
                  React Query
                </h1>
                <p className="text-xl text-gray-500 font-semibold mt-8">
                  Optimiza tus aplicaciones con React Query. Cambia tu estado
                  global gigante de Redux por una cache con el estado de tu
                  servidor.
                </p>
              </header>
            </div>

            <Subscribe />

            <section className="mx-auto prose prose-xl">
              <p>
                Manejar estado en React es complicado, si encima empezamos a
                mezclar estado del cliente con estado del servidor, la cosa se
                puede volver mucho más complicada.
              </p>

              <p>
                En este curso te enseño como usar React Query para crear
                aplicaciones web complejas manteniendo un codebase simple.
              </p>

              <p>
                Vengo usando <strong>React Query en producción</strong> desde
                hace meses y atento a su desarrollo desde que fue liberado Open
                Source.
              </p>
              <p>
                <strong>Data-Fetching con React Query</strong> es todo lo que sé
                sobre como usar React Query en aplicaciones de React para
                hacerte la vida más fácil como desarrollador al mismo tiempo que
                damos una mejor UX a los usuarios de nuestras aplicaciones.
              </p>
              <p>El curso está dividido en tres tipos de contenido.</p>
              <ul>
                <li>
                  Un eBook con el contenido escrito para quién prefiera leer en
                  vez de ver videos.
                </li>
                <li>
                  Un workshop en video que muestra los diferentes conceptos de
                  SWR por separado.
                </li>
                <li>
                  Una colección de videos donde muestro, paso a paso, como creo
                  una aplicación estilo Trello usando React Query.
                </li>
              </ul>
            </section>
          </section>
        </Container>
      </section>
    </section>
  );
}
