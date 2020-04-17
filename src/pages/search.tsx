import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../components/search/FullSearch";
import { Layout } from "../components/layout/Layout";
import { Meta } from "../components/Meta";
import { GetServerSideProps } from "next";
import { pathToSearchState } from "../components/search/searchClient";
import { assert } from "../lib/utils";

type SearchPageProps = FullSearchProps;
export default (props: SearchPageProps) => {
  return (
    <Layout>
      <Meta title="Search" />
      <FullSearch resultsState={props.resultsState} searchState={props.searchState} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  return {
    props: await getSearchServerSideProps(pathToSearchState(assert(context.req.url))),
  };
};
