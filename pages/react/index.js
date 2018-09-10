import Head from "next/head";
import Link from "next/link";
import { H1 } from "@sergiodxa/ui/lib/headings";
import { A as Anchor, P } from "@sergiodxa/ui/lib/text";
import { Code } from "@sergiodxa/ui/lib/code";
import { OL, LI } from "@sergiodxa/ui/lib/list";
import { blue } from "@sergiodxa/palette";
import { Table, THead, TBody, TR, TD } from "@sergiodxa/ui/lib/table";

import { LinkedHeader } from "../../components/header";
import Layout from "../../layouts/main";

const A = props => <Anchor color={blue} {...props} />

const exercises = [
  "Cargando React desde un CDN",
  "Hola Mundo con React",
  "Componentes con React",
  "Componente Personalizables usando Props",
  "Props con Valores por Defecto",
  "Tipos de Datos en React",
  "Composición de Componentes en React",
  "Componentes con Hijos Personalizables",
  <>Uso del prop especial <Code>children</Code></>,
  "Introducción a Babel y JSX",
  "Cargar Babel Standalone desde un CDN y usar JSX en vez de React.createElement",
  "Crear un componente usando una clase que extienda React.Component y en su render devuelva Title",
  <>Definir en el estado del componente el valor <Code>name</Code> como <Code>Mundo</Code> y usarlo como valor de Title</>,
  <>Definir <Code>static getDerivedStateFromProps</Code> para tomar el valor del prop <Code>name</Code> como valor del <Code>state</Code></>,
  <>Definir `componentDidMount` para que un segundo después de que se monta el componente se modifique el `name` invirtiéndo las letras</>,
  <>Definir los tipos de props de la clase usando `static propTypes`</>,
  <>Definir valores por defecto usando `static defaultProps`</>,
  <>Definir `componentDidUpdate` que un segundo después de que se actualiza el compoennte se modifique el `name` invirtiéndo las letras</>,
  <>Definir `componentWillUnmount` para remover el timer si sigue existiendo</>,
  <>Correctamente obtener el estado anterior antes de actualizarlo</>
]

function LearnReactPage() {
  return (
    <Layout>
      <Head>
        <title>Sergio Xalambrí</title>
      </Head>

      <LinkedHeader />

      <section id="learn-react">
        <H1>Aprende React en 100 días</H1>
        <P>¡Aprende React haciendo un ejercicio al día durante 100 días!</P>
        <P>
          Cada ejercicio te enseña un pequeño concepto de React y usa los
          aprendidos anteriormente.
        </P>
        <Table>
          <THead>
            <TR>
              <TD className="day"></TD>
              <TD>Tema</TD>
            </TR>
          </THead>
          <TBody>
            {exercises.map((exercise, index) => (
              <TR key={exercise}>
                <TD className="day">Día {index + 1}</TD>
                <TD>
                  <Link href={`/react/dia-${index + 1}`}>
                    <A href={`/react/dia-${index + 1}`}>
                    {exercise}
                    </A>
                  </Link>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </section>
      <style jsx>{`
        section {
          margin: 0 auto;
          max-width: 800px;
        }
        section :global(.day) {
          width: 50px;
          text-align: right;
        }
      `}</style>
    </Layout>
  );
}

export default LearnReactPage;
