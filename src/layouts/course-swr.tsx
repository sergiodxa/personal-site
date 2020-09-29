import * as React from "react";
import { Navigation } from "components/navigation";
import { Container } from "components/container";

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

function Title({ test }) {
  if (test === "A") {
    return (
      <h1>
        <small className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-none tracking-wide">Production-ready</small>
        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-wide block">
          Data-Fetching con React & SWR
        </span>
      </h1>
    );
  }
  return (
    <h1>
      <small className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black leading-none tracking-wide">Dominando el</small>
      <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-wide block">
        Server-State con React & SWR
      </span>
    </h1>
  );
}

function Logo() {
  return (
    <svg
      viewBox="0 0 291 69"
      fill="none"
      className="my-4 h-8 sm:h-10 md:h-16 lg:h-20 inline"
    >
      {logoSWR}
    </svg>
  );
}

export function SWRLandingLayout() {
  return (
    <section className="mb-12">
      <header>
        <Container>
          <Navigation
            current="SWR"
            title="Production-ready data-fetching en React con SWR"
            description="Aprende a sacarle el 100% a SWR para crear aplicaciones web."
            path="/courses/swr"
          />

          <Logo />

          <Title test="B" />
        </Container>
      </header>
    </section>
  );
}
