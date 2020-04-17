import React from "react";
import { GetStaticProps } from "next";
import { values, sortBy } from "lodash-es";
import { Card, StyledBody } from "baseui/card";
import { Layout } from "../../components/layout/Layout";
import { SupportLocalCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { $importer } from "../../lib/content";
import Link from "next/link";
import { Display3 } from "baseui/typography";

interface LocationsPageProps {
  locations: {
    _id: string;
    slug: string;
    name: string;
  }[];
}

export default (props: LocationsPageProps) => (
  <Layout>
    <Meta title="All Locations" />
    <SupportLocalCallout />
    <div className="container">
      <Card>
        <StyledBody>
          {props.locations.map((location) => (
            <Link key={location._id} href="/locations/[slug]" as={`/locations/${location.slug}`}>
              <a>
                <Display3>{location.name}</Display3>
              </a>
            </Link>
          ))}
        </StyledBody>
      </Card>
    </div>
  </Layout>
);

export const getStaticProps: GetStaticProps<LocationsPageProps, { slug: string }> = async (_context) => {
  await $importer.prepare();

  return {
    props: {
      locations: sortBy(values($importer.locations) as any[], "name"),
    },
  };
};
