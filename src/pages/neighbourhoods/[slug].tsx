import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../../components/search/FullSearch";
import { Layout } from "../../components/layout/Layout";
import { HeroCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { GetStaticProps } from "next";
import { $backend } from "../../lib/content";
import { values, find } from "lodash-es";
import { pathToSearchState } from "../../components/search/searchClient";

interface NeighbourhoodPageProps extends FullSearchProps {
  location: {
    slug: string;
    name: string;
  };
}

export default (props: NeighbourhoodPageProps) => {
  let searchState = props.searchState;

  // This page is statically generated ignoring the query params. Interpret them now live to rerender if required.
  if (typeof window !== "undefined") {
    searchState = pathToSearchState(window.location.href);
  }

  return (
    <Layout>
      <Meta title={`${props.location.name} Businesses`} />
      <HeroCallout heading={`Support businesses in ${props.location.name} when you can.`}>
        With retailers and restaurants in {props.location.name} temporarily shut down due to COVID-19, many folks are struggling. Find out
        who is open for business in your area and how to support them best here.
      </HeroCallout>
      <FullSearch path={props.path} searchState={searchState} resultsState={props.resultsState} showNeighbourhoodFacets={false} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<NeighbourhoodPageProps, { slug: string }> = async (context) => {
  await $backend.prepare();
  const searchState: any = {};

  const location = find($backend.locations, {
    slug: context.params && context.params.slug,
  });

  if (location) {
    searchState.refinementList = { location: [location.name] };
  } else {
    throw "Couldn't find location for slug";
  }

  return {
    props: {
      ...(await getSearchServerSideProps(searchState)),
      path: "/neighbourhoods/[slug]",
      location: location as any,
    },
  };
};

export const getStaticPaths = async () => {
  await $backend.prepare();

  return {
    paths: values($backend.locations).map((location) => ({
      params: { slug: location.slug },
    })),
    fallback: false,
  };
};
