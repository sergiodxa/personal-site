import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <script async src="//platform.twitter.com/widgets.js" />
          <NextScript />
        </body>
      </html>
    );
  }
}
