import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../components/search/FullSearch";
import { Layout } from "../components/layout/Layout";
import { Meta } from "../components/Meta";
import { GetServerSideProps } from "next";
import { pathToSearchState } from "../components/search/searchClient";
import { assert } from "../lib/utils";

type SearchPageProps = FullSearchProps;
export default (props: SearchPageProps) => {
  // don't need to parse search state again because this page is dynamically generated and pays attention to the query params
  return (
    <Layout>
      <Meta title="Search" />
      <FullSearch {...props} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  return {
    props: {
      path: "/search",
      ...(await getSearchServerSideProps(pathToSearchState(assert(context.req.url)))),
    },
  };
};
