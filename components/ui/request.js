import { Component } from 'react';
import { parse as parseURL } from 'url';
import { EventEmitter } from 'events';

import { Pre, Code } from './code';
import Case from '../case';

import * as colors from '../../lib/colors';

function formatCurl({ url, method = 'GET', headers, body }) {
  let request = `curl ${method !== 'GET' ? `-X ${method} ` : ''}${url}`;

  if (headers && Object.keys(headers).length > 0) {
    request = Object.entries(headers).reduce((req, [key, value]) => {
      return req + ` \\\n  -H ${key} ${value}`;
    }, request);
  }

  if (body) {
    if (typeof body !== 'string') {
      request = `${request} \\\n  -d '${JSON.stringify(body, null, 2)}'`;
    } else {
      request = `${request} \\\n  -d '${body}'`;
    }
  }

  return request;
}

function formatJS({ url, ...opts }) {
  return `await fetch("${url}", ${JSON.stringify(opts, null, 2)})`;
}

function formatHTTP({ url, method = 'GET', headers, body }) {
  const { path, host } = parseURL(url);

  return [
    `${method} ${path} HTTP/1.1`,
    `Host: ${host}`,
    ...Object.entries(headers).map(([key, value]) => `${key}: ${value}`),
    JSON.stringify(body, null, 2)
  ].join('\n');
}

const supportedLangs = {
  HTTP: formatHTTP,
  cURL: formatCurl,
  JavaScript: formatJS
};

const emitter = new EventEmitter();

class Request extends Component {
  state = {
    type: 'http'
  };

  componentDidMount() {
    window.addEventListener('storage', this.updateStorage);
    emitter.addListener('request-default-type', this.updateStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.updateStorage);
    emitter.removeListener('request-default-type', this.updateStorage);
  }

  updateStorage = ({ key, newValue, oldValue }) => {
    if (key !== 'request-default-type') return;
    if (newValue === oldValue) return;
    if (this.state.type === newValue) return;
    if (this.noUpdate) return;
    this.changeType(newValue);
  };

  changeType = type => {
    const current = this.state.type;
    this.noUpdate = true;
    emitter.emit('request-default-type', {
      key: 'request-default-type',
      newValue: type,
      oldValue: current
    });
    this.setState({ type }, () => {
      localStorage.setItem('request-default-type', type);
      this.noUpdate = false;
    });
  };

  handleClick = event => {
    const type = event.target.dataset.type;
    this.changeType(type);
  };

  render() {
    const { props, state } = this;

    return (
      <div className="request">
        <div className="buttons">
          {Object.keys(supportedLangs).map(lang => (
            <button
              className={
                state.type === lang.toLowerCase() ? 'active' : 'inactive'
              }
              type="button"
              data-type={lang.toLowerCase()}
              key={lang}
              onClick={this.handleClick}
            >
              {lang}
            </button>
          ))}
        </div>
        <Case
          value={state.type}
          onJavascript={
            <Pre>
              <Code className="hljs language-javascript">
                {formatJS(props)}
              </Code>
            </Pre>
          }
          onHttp={
            <Pre>
              <Code className="hljs language-plain">{formatHTTP(props)}</Code>
            </Pre>
          }
          onCurl={
            <Pre>
              <Code className="hljs language-shell">{formatCurl(props)}</Code>
            </Pre>
          }
        />

        <style jsx>{`
          .request {
            margin-top: 1rem;
          }
          .buttons {
            display: flex;
            margin-bottom: -1rem;
          }
          button {
            background-color: ${colors.white};
            border: 1px solid ${colors.black};
            border-radius: 0.25em 0.25em 0 0;
            border-bottom: none;
            font-size: 1em;
            outline: none;
            margin: 0 0.25em;
            transition: all 0.2s;
          }
          button:first-of-type {
            margin-left: 0;
          }
          button:last-of-type {
            margin-right: 0;
          }
          button.active,
          button:hover {
            background-color: ${colors.black};
            color: ${colors.white};
          }
        `}</style>
      </div>
    );
  }
}

export default Request;
