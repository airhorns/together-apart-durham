import React from "react";
import { FullSearch, getSearchServerSideProps, FullSearchProps } from "../../components/search/FullSearch";
import { Layout } from "../../components/layout/Layout";
import { HeroCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { GetStaticProps } from "next";
import { $backend } from "../../lib/backend";
import { values, find } from "lodash-es";
import { pathToSearchState } from "../../components/search/searchClient";
import { Grid, Cell } from "baseui/layout-grid";
import Imgix from "react-imgix";
import { webflowToImgixURL } from "../../lib/utils";
import { useStyletron } from "baseui";

interface NeighbourhoodPageProps extends FullSearchProps {
  location: {
    slug: string;
    name: string;
    "header-image"?: { url: string };
    "header-text"?: string;
    "location-page-header-title"?: string;
  };
}

export default (props: NeighbourhoodPageProps) => {
  let searchState = props.searchState;
  const [css, $theme] = useStyletron();

  // This page is statically generated ignoring the query params. Interpret them now live to rerender if required.
  if (typeof window !== "undefined") {
    searchState = pathToSearchState(window.location.href);
  }

  const heading = props.location["location-page-header-title"] || `Support businesses in ${props.location.name} when you can.`;
  const text =
    props.location["header-text"] ||
    `With retailers and restaurants in ${props.location.name} temporarily shut down due to COVID-19, many folks are struggling. Find out
  who is open for business in your area and how to support them best here.`;

  const headerImage = props.location["header-image"] && props.location["header-image"].url;

  return (
    <Layout>
      <Meta title={`${props.location.name} Businesses`} />
      <Grid>
        {headerImage &&
          ((
            <Cell span={[4, 4, 6]}>
              <Imgix
                src={webflowToImgixURL(headerImage)}
                sizes="100vw"
                className={css({ marginBottom: $theme.sizing.scale600, borderRadius: $theme.borders.radius200 })}
                imgixParams={{ ar: "2:1", fit: "crop" }}
                htmlAttributes={{ alt: props.location.name, loading: "lazy", style: { zIndex: 2 } }}
              />
            </Cell>
          ) as any)}
        <Cell span={[4, headerImage ? 4 : 8, headerImage ? 6 : 12]}>
          <div className={css({ height: "100%", display: "flex", justifyContent: "center" })}>
            <HeroCallout heading={heading}>
              <p dangerouslySetInnerHTML={{ __html: text }} />
            </HeroCallout>
          </div>
        </Cell>
      </Grid>

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
