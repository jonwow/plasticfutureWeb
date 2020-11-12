import React from "react";
import { Helmet } from "react-helmet";


export default () => (
  document.title = 'P L A S T I C F U T U R E' &&
  <Helmet>
    <meta charset="UTF-8"></meta>
    <meta
      name="viewport"
      content="width=device-width, height=device-height, initial-scale=1.0"
    ></meta>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
    <meta
      name="description"
      content="PLASTIC FUTURE OFFERS PREMIUM QUALITY CLOTHING WITH FUTURISTIC IDEAS"
    ></meta>


    <link
      rel=" apple-touch-icon"
      sizes="180x180"
      href="/favicon/apple-touch-icon.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon/favicon-32x32.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon/favicon-16x16.png"
    ></link>
    <link rel="manifest" href="/favicon/site.webmanifest"></link>
    <link
      rel="mask-icon"
      href="/favicon/safari-pinned-tab.svg"
      color="#5bbad5"
    ></link>
    <link rel="shortcut icon" href="/favicon/favicon.ico"></link>
    <meta name="msapplication-TileColor" content="#da532c"></meta>
    <meta
      name="msapplication-config"
      content="/favicon/browserconfig.xml"
    ></meta>
    <meta name="theme-color" content="#ffffff"></meta>
  </Helmet>
);
