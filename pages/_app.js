import App from 'next/app';
import React from 'react';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <div>
        <Component {...pageProps} key={router.route} />
        <style jsx global>{`


          @font-face {
            font-family: 'Big Caslon';
            src: url('/fonts/BigCaslon.ttf');
          }

          @font-face {
            font-family: 'InriaSerif-Regular';
            src: url('/fonts/InriaSerif-Regular.ttf');
          }

          html {
            position: relative;
          }

          body {
            margin: 0px !important;
          }

          a {
            color: black;
          }

          h1,h2,h3,h4,h5,h6,p {
            margin: 0;
          }

          ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          ::selection {
            background: #fefc99;
          }

          * {
            font-family: 'InriaSerif-regular', 'Big Calson';
            font-weight: 400;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: geometricPrecision;
            line-height: 1.45;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }

        `}</style>
      </div>
    )
  }
}
