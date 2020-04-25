import React from "react";
import Head from "next/head";
import { CurrentSite } from "../lib/sites";

export const Meta = (props: { title?: string; description?: string; ogImage?: string }) => {
  const title = (props.title || `Support ${CurrentSite.regionName} Businesses during COVID-19`) + " | Together Apart";
  const description =
    props.description ||
    "With businesses in the National Capital region temporarily shut down due to COVID-19, many folks are struggling. Support them by buying today!";
  const ogImage = props.ogImage || "/images/together-apart-og.png";

  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={ogImage} property="og:image" />
    </Head>
  );
};
