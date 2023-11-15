import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        {process.env.NEXT_PUBLIC_GITHUB_ACTIONS == false && <><link rel="icon" href={"/favicon.ico"} sizes="32x32"></link>
          <link rel="icon" href={"/favicon.ico"} sizes="192x192"></link>
          <link rel="apple-touch-icon" href={"/favicon.ico"}></link></>
          ||
          <><link rel="icon" href={"/favicon.ico"} sizes="32x32"></link>
            <link rel="icon" href={"/favicon.ico"} sizes="192x192"></link>
            <link rel="apple-touch-icon" href={"/favicon.ico"}></link></>}
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument