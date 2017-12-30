import { Component } from 'react';
import Head from 'next/head';
import classnames from 'classnames';

class Tweet extends Component {
  state = { rendered: false };
  
  async componentDidMount() {
    await twttr.widgets.createTweet(this.props.id, this.element);
    this.setState({ rendered: true });
  }

  setRef = element => {
    this.element = element;
  };

  render() {
    return (
      <span
        className={classnames('twitter-tweet', {
          rendered: this.state.rendered
        })}
        ref={this.setRef}
      >
        <Head>
          <script src="//platform.twitter.com/widgets.js" />
        </Head>
        <style jsx>{`
          .twitter-tweet {
            display: flex;
            justify-content: center;
            width: 100%;
          }

          .twitter-tweet:not(.rendered) {
            display: none;
          }
        `}</style>
      </span>
    );
  }
}

export default Tweet;
