import Link from "next/link";
import { Navigation } from "components/navigation";
import { Memoji } from "components/memoji";
import { Container } from "components/container";
import { Header } from "components/header";
import { Spacer } from "components/spacer";
import { DesktopOnly } from "components/media-query";

type Item = { url: string; name: string; description: string };

type Content = Array<[string, string, string]>

const editor: Content = [
  ["https://code.visualstudio.com/", "Visual Studio Code", "My main IDE."]
];

const coding: Content = [
  ["", "TypeScript", "Programming language."],
];

export default function Stack() {
  return (
    <>
      <Header>
        <Container>
          <Navigation current="home" title="Uses" />

          <aside className="flex items-start mb-4 space-x-4">
            <div className="mt-4">
              <h2 className="text-2xl text-orange-500 font-semibold">
                What I Use
              </h2>
              <p className="prose">
                With the time I have used many different technologies to work.
                <br />
                This is a list of my current preferred stack.
              </p>
            </div>

            <Spacer />

            <figure className="flex-shrink-0">
              <DesktopOnly>
                <Memoji name="working" width={210} />
              </DesktopOnly>
            </figure>
          </aside>
        </Container>
      </Header>

      <Container>
        <div className="space-y-4">
          <Section title="Editor">
            <List>
              {editor.map(([url, name, description]) => (
                <Item
                  key={url}
                  url={url}
                  name={name}
                  description={description}
                />
              ))}
            </List>
          </Section>
          <Section title="Coding">
            <List>
              {coding.map(([url, name, description]) => (
                <Item
                  key={url}
                  url={url}
                  name={name}
                  description={description}
                />
              ))}
            </List>
          </Section>
          <Section title="Tools">
            <ul>
              <li>
                <a href="https://www.apple.com/safari/">Safari</a> as my main
                browser.
              </li>
              <li>
                <a href="https://sizzy.co">Sizzy</a> as my development browser.
              </li>
              <li>
                <a href="https://prettier.io">Prettier</a> (within a VSCode
                plugin) with the default configuration.
              </li>
              <li>
                <a href="https://hyper.is/">Hyper</a> as my terminal outside
                VSCode.
              </li>
              <li>
                <a href="https://github.com">GitHub</a> for my code
                repositories.
              </li>
            </ul>
          </Section>
          <Section title="Desktop Apps">
            <ul>
              <li>
                <a href="https://www.apple.com/safari/">Safari</a> as my main
                browser.
              </li>
              <li>
                <a href="https://sizzy.co">Sizzy</a> as my development browser.
              </li>
              <li>
                <a href="https://prettier.io">Prettier</a> (within a VSCode
                plugin) with the default configuration.
              </li>
              <li>
                <a href="https://hyper.is/">Hyper</a> as my terminal outside
                VSCode.
              </li>
              <li>
                <a href="https://github.com">GitHub</a> for my code
                repositories.
              </li>
            </ul>
          </Section>
        </div>
      </Container>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="-mt-6 md:-mt-12 bg-black p-4 rounded-lg border-gray-900 border-4">
      <header>
        <h3 className="text-md font-semibold">{title}</h3>
      </header>

      <article>{children}</article>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-4 list-inside">{children}</ul>;
}

function Item({ url, name, description }: Item) {
  return (
    <li className="my-1">
      <a
        href={url}
        className="underline text-orange-500 font-semibold hover:no-underline"
      >
        {name}
      </a>{" "}
      — {description}
    </li>
  );
}
