import React from "react";
import {
  FullSearch,
  getSearchServerSideProps,
  FullSearchProps,
} from "../../components/search/FullSearch";
import { Layout } from "../../components/layout/Layout";
import { SupportLocalCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { GetStaticProps } from "next";
import { $importer } from "../../lib/content";
import { values, find } from "lodash-es";

export default (props: FullSearchProps) => (
  <Layout>
    <Meta />
    <SupportLocalCallout />
    <FullSearch {...props} />
  </Layout>
);

export const getStaticProps: GetStaticProps<
  FullSearchProps,
  { slug: string }
> = async (context) => {
  await $importer.prepare();
  const searchState: any = {};

  const location = find($importer.locations, {
    slug: context.params && context.params.slug,
  });

  if (location) {
    searchState.refinementList = { location: [location.name] };
  }

  return {
    props: await getSearchServerSideProps(searchState),
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
