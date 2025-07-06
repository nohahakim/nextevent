// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  // 1) collect initial props
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  // 2) render
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="overlays" />
        </body>
      </Html>
    );
  }
}
