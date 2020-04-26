import React from "react";
import { FullSearch, FullSearchProps } from "../../components/search/FullSearch";
import { Layout } from "../../components/layout/Layout";
import { HeroCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { GetStaticProps } from "next";
import { $backend } from "../../lib/backend";
import { values, find, keys } from "lodash-es";
import { pathToSearchState } from "../../components/search/searchClient";
import { Grid, Cell } from "baseui/layout-grid";
import Imgix from "react-imgix";
import { imgixURL, assert } from "../../lib/utils";
import { useStyletron } from "baseui";
import { getSearchServerSideProps } from "../../components/search/serverSearch";

const REDIRECTED_SLUGS: Record<string, string> = {
  "hintonburg-mechanicsville": "wellington-west",
};

interface NeighbourhoodPageProps extends FullSearchProps {
  location: {
    slug: string;
    name: string;
    "header-image"?: { url: string };
    "location-page-nav-co-branding-logo"?: { url: string };
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

  const heading = props.location["location-page-header-title"] || `Support local in ${props.location.name}.`;
  const text =
    props.location["header-text"] ||
    `Small businesses in ${props.location.name} are open and need your support to stay afloat during the pandemic.`;

  const headerImage = props.location["header-image"] && props.location["header-image"].url;

  const coBrand = props.location["location-page-nav-co-branding-logo"] ? (
    <img width={120} src={props.location["location-page-nav-co-branding-logo"].url} />
  ) : null;

  return (
    <Layout coBrand={coBrand}>
      <Meta title={`${props.location.name} Businesses`} />
      <Grid>
        {headerImage &&
          ((
            <Cell span={[4, 4, 6]}>
              <Imgix
                src={imgixURL(headerImage)}
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

      <FullSearch
        path={props.path}
        searchState={searchState}
        resultsState={props.resultsState}
        showNeighbourhoodFacets={false}
        baseFilters={`location:"${props.location.name}"`}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<NeighbourhoodPageProps, { slug: string }> = async (context) => {
  await $backend.prepare();
  const searchState: any = {};
  let slug = assert(context.params).slug;
  if (REDIRECTED_SLUGS[slug]) {
    slug = REDIRECTED_SLUGS[slug];
  }

  const location = find($backend.locations, { slug });

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
  const locationPaths = values($backend.locations)
    .map((location) => ({
      params: { slug: location.slug },
    }))
    .concat(keys(REDIRECTED_SLUGS).map((slug) => ({ params: { slug } })));

  return {
    paths: locationPaths,
    fallback: false,
  };
};
