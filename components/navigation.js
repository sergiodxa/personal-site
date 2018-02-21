import Link from "next/link";
import { A } from "./ui/text";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/about" prefetch>
            <A href="/about" title="About Sergio Xalambrí">
              About me
            </A>
          </Link>
        </li>
        <li>
          <Link href="/essays" prefetch>
            <A href="/essays" title="Essays and Articles">
              Essays
            </A>
          </Link>
        </li>
        <li>
          <Link href="/services" prefetch>
            <A href="/services" title="The services I offer">
              Services
            </A>
          </Link>
        </li>
        <li>
          <A href="https://sdx.im/twitter" title="Thoughts" rel="me">
            Thoughts
          </A>
        </li>
      </ul>

      <style jsx>{`
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          font-size: 1em;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          text-align: center;
        }

        ul {
          list-style: none;
          padding-top: 1em;
          padding-left: 0;
        }

        li {
          padding: 0.25em 0.5em;
        }

        @media (min-width: 720px) {
          ul {
            padding-top: 0;
          }

          li {
            font-size: 1.25em;
            padding: 1em;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navigation;
