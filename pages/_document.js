import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
     <html lang="en">
       <Head>
         <link rel="manifest" href="/static/manifest.json" />
         <meta name="theme-color" content="#000000" />
         <link rel="shortcut icon" href="/static/favicon.ico" />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
