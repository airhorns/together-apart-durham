import React from "react";
import { FullSearch, FullSearchProps } from "../components/search/FullSearch";
import { Layout } from "../components/layout/Layout";
import { SupportLocalCallout } from "../components/HeroCallout";
import { Meta } from "../components/Meta";
import { GetStaticProps } from "next";
import { pathToSearchState } from "../components/search/searchClient";
import { getSearchServerSideProps } from "../components/search/serverSearch";

type IndexPageProps = FullSearchProps;

export default (props: FullSearchProps) => {
  let searchState = props.searchState;

  // This page is statically generated ignoring the query params. Interpret them now live to rerender if required.
  if (typeof window !== "undefined") {
    searchState = pathToSearchState(window.location.href);
  }

  return (
    <Layout>
      <Meta />
      <SupportLocalCallout />
      <FullSearch {...props} searchState={searchState} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async (_context) => {
  return {
    props: {
      path: "/",
      ...(await getSearchServerSideProps({})),
    },
  };
};
