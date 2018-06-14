import { Component } from "react";

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
