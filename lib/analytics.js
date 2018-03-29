import fetch from "isomorphic-fetch";
import { parse } from "querystring";

const log = ({ type, action, description = "" } = {}) => {
  let message = [`[${type}]`, action];

  if (description) message.push(description);

  message = message.join(" - ");

  switch (type) {
    case "error": {
      console.error(message);
    }
    case "warning": {
      console.warn(message);
    }
    case "info": {
      console.info(message);
    }
    default: {
      console.log(message);
    }
  }
};

export const track = async ({ type, action, description = "" } = {}) => {
  if (localStorage.getItem("no-track")) return;

  const { source } = parse(location.search);

  log({ type, action, description });

  if (process.env.NODE_ENV === "production") {
    await fetch("https://sergiodxa.com/api/analytics", {
      method: "POST",
      body: JSON.stringify({
        type,
        action,
        description,
        source
      })
    });
  }
};

export const event = async ({ action = "", description = "" } = {}) => {
  await track({ type: "event", action, description });
};

export const warning = async ({ action = "", description = "" } = {}) => {
  await track({ type: "warning", action, description });
};

export const error = async ({ action = "", description = "" } = {}) => {
  await track({ type: "error", action, description });
};

export const info = async ({ action = "", description = "" } = {}) => {
  await track({ type: "info", action, description });
};
