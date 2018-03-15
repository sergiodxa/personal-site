export function Table({ children, ...props }) {
  return (
    <table {...props}>
      {children}
      <style jsx>{`
        table {
          font-size: 0.9rem;
          width: 100%;
        }
      `}</style>
    </table>
  );
}

export function TH({ children, ...props }) {
  return (
    <th {...props}>
      {children}
      <style jsx>{`
        th {
          padding: 5px;
          color: #9b9b9b;
          font-style: oblique;
          font-weight: normal;
          text-align: left;
        }
      `}</style>
    </th>
  );
}

export function TR({ children, ...props }) {
  return (
    <tr {...props}>
      {children}
      <style jsx>{`
        tr {
          padding: 5px;
        }
      `}</style>
    </tr>
  );
}

export function TD({ children, ...props }) {
  return (
    <td {...props}>
      {children}
      <style jsx>{`
        td {
          padding: 5px;
        }
      `}</style>
    </td>
  );
}

export function THead({ children, ...props }) {
  return (
    <thead {...props}>
      {children}
      <style jsx>{`
        thead {
        }
      `}</style>
    </thead>
  );
}

export function TBody({ children, ...props }) {
  return (
    <tbody {...props}>
      {children}
      <style jsx>{`
        tbody {
        }
      `}</style>
    </tbody>
  );
}

export function TFoot({ children, ...props }) {
  return (
    <tfoot {...props}>
      {children}
      <style jsx>{`
        tfoot {
        }
      `}</style>
    </tfoot>
  );
}
