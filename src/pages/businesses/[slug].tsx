import React from "react";
import NotFoundPage from "../404";
import { Hit } from "react-instantsearch-core";
import { Layout } from "../../components/layout/Layout";
import { Meta } from "../../components/Meta";
import { GetStaticProps, GetStaticPaths } from "next";
import { $backend } from "../../lib/backend";
import { useStyletron } from "baseui";
import { BusinessDoc } from "../../lib/types";
import { StaticBusinessCard } from "../../components/search/BusinessCard/StaticBusinessCard";
import { assert } from "../../lib/utils";

interface BusinessPageProps {
  business?: Hit<BusinessDoc>;
}

export default (props: BusinessPageProps) => {
  const [css, $theme] = useStyletron();

  if (!props.business) {
    return <NotFoundPage />;
  }

  return (
    <Layout>
      <Meta title={`${props.business.name} Businesses`} />
      <StaticBusinessCard hit={props.business} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BusinessPageProps, { slug: string }> = async (context) => {
  await $backend.prepare();
  const searchResponse = await $backend.$index.search<Hit<BusinessDoc>>("", { filters: `slug:"${assert(context.params).slug}"` });

  return {
    props: { business: searchResponse.hits[0] },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await $backend.prepare();
  const paths: { params: Record<string, string> }[] = [];

  if (process.env.NODE_ENV == "production") {
    $backend.paginatedItems(async (page) => {
      page.items.filter($backend.readyForPublish).forEach((item) => {
        paths.push({ params: { slug: item.slug } });
      });
    });
  }

  return {
    paths: paths,
    fallback: true,
  };
};
