import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../../components/search/FullSearch";
import { Layout } from "../../components/layout/Layout";
import { HeroCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { GetStaticProps } from "next";
import { $importer } from "../../lib/content";
import { values, find } from "lodash-es";

interface LocationPageProps extends FullSearchProps {
  location: {
    slug: string;
    name: string;
  };
}

export default (props: LocationPageProps) => (
  <Layout>
    <Meta title={`${props.location.name} Businesses`} />
    <HeroCallout heading={`Support businesses in ${props.location.name} when you can.`}>
      With retailers and restaurants in {props.location.name} temporarily shut down due to COVID-19, many folks are struggling. Find out who
      is open for business in your area and how to support them best here.
    </HeroCallout>
    <FullSearch searchState={props.searchState} resultsState={props.resultsState} showLocationFacets={false} />
  </Layout>
);

export const getStaticProps: GetStaticProps<LocationPageProps, { slug: string }> = async (context) => {
  await $importer.prepare();
  const searchState: any = {};

  const location = find($importer.locations, {
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
      location: location as any,
    },
  };
};

export const getStaticPaths = async () => {
  await $importer.prepare();

  return {
    paths: values($importer.locations).map((location) => ({
      params: { slug: location.slug },
    })),
    fallback: false,
  };
};
