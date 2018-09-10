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
  "Componentes de Clase",
  "Estado y Ciclo de Vida",
  "Uso de static getDerivedStateFromProps",
  "Uso de componentDidMount",
  "Uso de componentDidUpdate",
  "Uso de componentWillUnmount",
  "Uso de shouldComponentUpdate",
  "PureComponent",
  "Uso de getSnapshotBeforeUpdate",
  "propTypes y defaultProps usando static en clases",
  "Eventos",
  "Render Condicional",
  "Listas y key",
  "Elevando el Estado",
  "Composición vs Herencia",
  "Componentes Controlados",
  "Uso de <select />",
  "Uso de <textarea />",
  "Accesibilidad",
  "Code Splitting",
  "Contexto",
  "Manejo de Errores",
  "Acceso al DOM con refs",
  "Fragmentos",
  "Componentes de Alto Orden",
  "Detectar Problemas de Rendimiento",
  "Portales",
  "Render Props",
  "Modo Estricto",
  "Pruebas con Jest y Snapshots",
  "Pruebas Automatizadas",
  "Componentes Inteligentes y de UI"
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
