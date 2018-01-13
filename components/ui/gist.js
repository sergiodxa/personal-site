import { Component } from "react";
import Head from "next/head";
import classnames from "classnames";

class Gist extends Component {
  render() {
    return (
      <div>
        <script async src={`${this.props.src}.js`} />
      </div>
    );
  }
}

export default Gist;
