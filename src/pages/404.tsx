import React from "react";
import { Layout } from "../components/layout/Layout";
import { HeroCallout } from "../components/HeroCallout";
import { Meta } from "../components/Meta";

export default (props: {}) => {
  return (
    <Layout>
      <Meta title="Not Found" />
      <HeroCallout heading="Not Found">The requested page couldn&apos;t be found, sorry!</HeroCallout>
    </Layout>
  );
};
