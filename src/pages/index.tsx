import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../components/search/FullSearch";
import { Layout } from "../components/layout/Layout";
import { SupportLocalCallout } from "../components/HeroCallout";
import { Meta } from "../components/Meta";
import { GetStaticProps } from "next";
import { pathToSearchState } from "../components/search/searchClient";

interface IndexPageProps {
  resultsState: FullSearchProps["resultsState"];
  searchState: FullSearchProps["searchState"];
}

export default (props: IndexPageProps) => {
  let searchState = props.searchState;

  // This page is statically generated ignoring the query params. Interpret them now live to rerender if required.
  if (typeof window !== "undefined") {
    searchState = pathToSearchState(window.location.href);
  }

  return (
    <Layout>
      <Meta />
      <SupportLocalCallout />
      <FullSearch resultsState={props.resultsState} searchState={searchState} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async (_context) => {
  return {
    props: await getSearchServerSideProps({}),
  };
};
