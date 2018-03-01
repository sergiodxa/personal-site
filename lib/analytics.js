import fetch from "isomorphic-fetch";
import { stringify } from "querystring";

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
  const qs = stringify({ type, action, description });
  log({ type, action, description });
  if (process.env.NODE_ENV === "production") {
    await fetch(`https://analytics.sergiodxa.com?${qs}`);
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
