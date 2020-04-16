import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../components/search/FullSearch";
import { Layout } from "../components/layout/Layout";
import { SupportLocalCallout } from "../components/HeroCallout";
import { Meta } from "../components/Meta";
import { GetStaticProps } from "next";

export default (props: FullSearchProps) => (
  <Layout>
    <Meta />
    <SupportLocalCallout />
    <FullSearch {...props} />
  </Layout>
);

export const getStaticProps: GetStaticProps<FullSearchProps> = async (_context) => {
  return {
    props: await getSearchServerSideProps({}),
  };
};
