import { Component } from "react";

import { P } from "./ui/text";
import Case from "./case";

import { event } from "../lib/analytics.js";
import * as colors from "../lib/colors";
import fetch from "../lib/fetch";

const gql = String.raw;

const query = gql`
  mutation subscribe($email: String!) {
    subscribe(email: $email)
  }
`;

class SubscribeForm extends Component {
  state = { email: "", status: "idle", errors: [], message: "" };

  handleChange = event => this.setState({ email: event.target.value });

  handleSubmit = async event => {
    event.preventDefault();

    const { email } = this.state;

    this.setState({ status: "loading" });

    const variables = { email };

    const { errors = [], data } = await fetch({ query, variables });

    if (errors.length > 0) {
      return this.setState({ errors, status: "failed" });
    }

    this.setState({ email: "", status: "success", message: data.subscribe });

    event({
      action: "Subscription form",
      description: `User ${email} subscribed to email list`
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="#">
        <label htmlFor="email">
          <P>
            Do you want to receive this essays before anyone else?<br />
            Subscribe below and keep updated.
          </P>
        </label>

        <input
          id="email"
          type="email"
          required
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="your@email.com"
          disabled={this.state.status === "loading"}
        />

        <Case
          value={this.state.status}
          onLoading={<P className="loading">Loading...</P>}
          onFailed={
            <P className="error">
              Error:{" "}
              {this.state.errors.map(error => (
                <span key={error.message}>{error.message}</span>
              ))}
            </P>
          }
          onSuccess={<P className="success">{this.state.message}</P>}
        />

        <style jsx>{`
          form {
            margin: 2em auto;
            text-align: center;
            width: 80%;
          }

          input {
            border: none;
            border-bottom: 2px solid ${colors.grey};
            box-sizing: border-box;
            border-radius: 0;
            display: block;
            font-size: 1em;
            margin: 1em auto;
            outline: none;
            text-align: center;
            transition: all 0.3s;
            padding: 0.5em;
            width: 100%;
          }

          input:hover {
            border-bottom-color: ${colors.black};
          }

          input:disabled {
            background-color: ${colors.grey};
            color: ${colors.white};
          }

          :global(.loading) {
            color: ${colors.blue};
          }

          :global(.error) {
            color: ${colors.red};
          }

          :global(.success) {
            color: ${colors.green};
          }

          @media (min-width: 720px) {
            input {
              width: 62.5%;
            }
          }
        `}</style>
      </form>
    );
  }
}

export default SubscribeForm;
