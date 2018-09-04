import { Children } from "react";
import { blue } from "@sergiodxa/palette";

const grey = "#eee";

function DevToolsHeader() {
  return (
    <div>
      <ul>
        <li>Elements</li>
        <li className="active">Console</li>
        <li>Network</li>
        <li>Sources</li>
        <li>Application</li>
        <li>Memory</li>
        <li>Audits</li>
        <li>Performance</li>
      </ul>

      <style jsx>{`
        ul {
          background-color: ${grey};
          display: flex;
          font-size: 12px;
          list-style-type: none;
          padding-left: 0;
          justify-content: flex-start;
          cursor: default;
        }
        li {
          border-bottom: 1px solid transparent;
          text-align: center;
          padding: .5em 1em;
        }
        .active {
          border-bottom-color: ${blue};
        }

        @media (max-width: 768px) {
          ul {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

function DevTools({ children }) {
  return (
    <div className="container">
      <DevToolsHeader />

      {Children.map(children, child => (
        <div className="item">{child}</div>
      ))}

      <style jsx>{`
        .container {
          margin: 1.5em -12.5vw;
          border-left: 1px solid ${grey};
          border-right: 1px solid ${grey};
        }
        .item {
          border-bottom: 1px solid ${grey};
          padding: .25em .5em;
        }

        @media (max-width: 768px) {
          .container {
            margin: 1em -1em;
          }
        }
      `}</style>
    </div>
  )
}

export default DevTools;
