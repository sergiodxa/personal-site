import { memo } from "react";
import { Code } from "@sergiodxa/ui/lib/code";

import FolderIcon from "../icons/folder";
import FileIcon from "../icons/file";

function sortByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortByType(a, b) {
  if ((a.type === "folder" || a.type === "directory") && b.type === "file") {
    return -1;
  }
  if (a.type === "file" && (b.type === "folder" || b.type === "directory")) {
    return 1;
  }
  return 0;
}

function mapChildren(children, level = 0) {
  return children
    .sort(sortByName)
    .sort(sortByType)
    .map(item => {
      if (item.type === "file") {
        return <File level={level} key={item.name + item.type} {...item} />;
      }
      if (item.type === "directory" || item.type === "folder") {
        return <Folder level={level} key={item.name + item.type} {...item} />;
      }
      return null;
    });
}

function calcIdents(level) {
  return Array.from(Array(level), (_, i) => <Ident key={i} />);
}

const Name = memo(props => {
  return (
    <span>
      {props.children}
      <style jsx>{`
        span {
          font-size: 0.9em;
        }
      `}</style>
    </span>
  );
});

const Ident = memo(() => {
  return (
    <span>
      <style jsx>{`
        span {
          display: inline-block;
          width: 30px;
          height: 28px;
          background-image: linear-gradient(
            to right,
            transparent 11px,
            rgb(234, 234, 234) 11px,
            rgb(234, 234, 234) 12px,
            transparent 12px
          );
          vertical-align: top;
          background-repeat: no-repeat;
        }
      `}</style>
    </span>
  );
});

const Icon = memo(({ kind }) => {
  const icon = kind === "file" ? <FileIcon /> : <FolderIcon />;
  return (
    <i>
      {icon}
      <style jsx>{`
        i {
          margin-right: 0.25em;
          display: inline-flex;
        }
      `}</style>
    </i>
  );
});

const File = memo(props => {
  return (
    <li>
      {calcIdents(props.level)}
      <div>
        <Icon kind={props.type} />
        <Name>{props.name}</Name>
      </div>
      <style jsx>{`
        li {
          display: flex;
          align-items: center;
        }
        div {
          height: 28px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </li>
  );
});

const Folder = memo(props => {
  return (
    <li>
      <div>
        {calcIdents(props.level)}
        <Icon kind={props.type} />
        <Name>{props.name}</Name>
      </div>
      <ul>{mapChildren(props.children, props.level + 1)}</ul>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
      `}</style>
    </li>
  );
});

const FileTree = memo(props => {
  if (typeof props.children !== "string") return <Code {...props} />;
  return (
    <div>
      <ul>{mapChildren(JSON.parse(props.children), 0)}</ul>
      <style jsx>{`
        div {
          box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 5px 0px;
          background: rgb(255, 255, 255);
          border-radius: 5px;
          transition: all 0.2s ease 0s;
          user-select: none;
          margin: 0 -2em 3em;
          padding: 1em 2em;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        @media (max-width: 720px) {
          div {
            box-shadow: none;
            border-radius: 0;
            margin: 0;
            padding: 1em 0.5em;
          }
        }
      `}</style>
    </div>
  );
});

export default FileTree;
