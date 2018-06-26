import { PureComponent } from "react";
import { string } from "prop-types";

import { P } from "@sergiodxa/ui/lib/text";

import { grey, dark, light, success } from "@sergiodxa/palette";

class SubscribeForm extends PureComponent {
  static propTypes = {
    copy: string
  };

  static defaultProps = {
    copy: "Do you want to receive this essays before anyone else?"
  };

  state = { email: "", sent: false };

  handleChange = event => this.setState({ email: event.target.value });

  handleSubmit = async () => {
    this.setState({
      email: "",
      sent: true,
    }, () => {
      setTimeout(() => {
        this.setState({ sent: false });
      }, 10000);
    });
  };

  render() {
    return (
      <form
        action="https://tinyletter.com/sergiodxa"
        method="POST"
        target="popupwindow"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="email">
          <P>
            {this.props.copy}
            <br />
            Subscribe below and keep updated.
          </P>
        </label>

        <input
          id="tlemail"
          type="email"
          required
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="your@email.com"
          disabled={this.state.status === "loading"}
        />

        {this.state.sent && (
          <P className="success">Thanks for subscribing!</P>
        )}

        <style jsx>{`
          form {
            margin: 2em auto;
            text-align: center;
            width: 80%;
          }

          input {
            border: none;
            border-bottom: 2px solid ${grey};
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
            background-color: white;
            border-bottom-color: ${dark};
          }

          input:disabled {
            background-color: ${grey};
            color: ${light};
          }

          :global(.success) {
            color: ${success};
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
