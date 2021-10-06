import Document, { Head, Html, Main, NextScript } from 'next/document';
// eslint-disable-next-line
// @ts-ignore
import React from 'react';

export default class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='ja'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
