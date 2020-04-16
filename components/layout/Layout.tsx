import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import Head from "next/head";

export const Layout = (props: { children: React.ReactNode }) => (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
      <script>{`WebFont.load({google:{families:["DM Sans:regular,500,700","DM Serif Display:regular"]}});`}</script>
      <meta
        content="https://uploads-ssl.webflow.com/5e7a31dcdd44a76199b8112d/5e7e1bb3a3d3d67f4cef9bed_together-apart-og.png"
        property="og:image"
      />
      <meta content="summary" name="twitter:card" />
    </Head>
    <NavBar />
    {props.children}
    <Footer />
  </>
);
