import React from "react";
import { FullSearch, FullSearchProps } from "../../components/search/FullSearch";
import { Layout } from "../../components/layout/Layout";
import { HeroCallout } from "../../components/HeroCallout";
import { Meta } from "../../components/Meta";
import { GetStaticProps } from "next";
import { $backend } from "../../lib/backend";
import { values, find, keys, range, compact } from "lodash-es";
import { pathToSearchState } from "../../components/search/searchClient";
import Imgix from "react-imgix";
import { imgixURL, assert } from "../../lib/utils";
import { useStyletron } from "baseui";
import { getSearchServerSideProps } from "../../components/search/serverSearch";
import { CurrentSiteName } from "../../lib/sites";
import { Button } from "baseui/button";
import { Block } from "baseui/block";

const REDIRECTED_SLUGS: Record<string, string> =
  CurrentSiteName == "ottawa"
    ? {
        "hintonburg-mechanicsville": "wellington-west",
      }
    : {};

interface NeighbourhoodPageProps extends FullSearchProps {
  location: {
    slug: string;
    name: string;
  };
  landingPageConfig: null | {
    "header-image"?: { url: string };
    "header-title"?: string;
    "header-text"?: string;
    "cobranding-header-image"?: { url: string };
    "call-to-action-button-1-text"?: string;
    "call-to-action-button-1-url"?: string;
    "call-to-action-button-2-text"?: string;
    "call-to-action-button-2-url"?: string;
    "call-to-action-button-3-text"?: string;
    "call-to-action-button-3-url"?: string;
  };
}

export default (props: NeighbourhoodPageProps) => {
  let searchState = props.searchState;
  const [css, _$theme] = useStyletron();

  // This page is statically generated ignoring the query params. Interpret them now live to rerender if required.
  if (typeof window !== "undefined") {
    searchState = pathToSearchState(window.location.href);
  }

  const heading = props.landingPageConfig?.["header-title"] || `Support local in ${props.location.name}.`;
  const text =
    props.landingPageConfig?.["header-text"] ||
    `Small businesses in ${props.location.name} are open and need your support to stay afloat during the pandemic.`;

  const coBrandLogo = props.landingPageConfig?.["cobranding-header-image"] ? (
    <Imgix width={120} src={imgixURL(props.landingPageConfig["cobranding-header-image"].url)} sizes="50vw" />
  ) : null;

  const callsToAction = compact(
    range(1, 3).map((index) => {
      if (props.landingPageConfig) {
        const config = props.landingPageConfig as any;
        const key = `call-to-action-button-${index}`;
        if (config[key + `-text`] && config[key + `-url`]) {
          return (
            <Block marginRight="scale400">
              <Button key={index} href={config[key + `-url`]}>
                {config[key + `-text`]}
              </Button>
            </Block>
          );
        }
      }
    })
  );

  return (
    <Layout coBrand={coBrandLogo}>
      <Meta title={`${props.location.name} Businesses`} />
      <div className={css({ display: "flex", justifyContent: "center" })}>
        <HeroCallout heading={heading}>
          <p dangerouslySetInnerHTML={{ __html: text }} />
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
            })}
          >
            {callsToAction}
          </div>
        </HeroCallout>
      </div>

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

  const location = find($backend.currentSiteLocations, { slug });

  if (location) {
    searchState.refinementList = { location: [location.name] };
  } else {
    throw "Couldn't find location for slug";
  }

  const landingPageConfig = location?.["landing-page-configuration"]
    ? ($backend.landingPages[location["landing-page-configuration"]] as any)
    : null;

  console.log(location, landingPageConfig);
  return {
    props: {
      ...(await getSearchServerSideProps(searchState)),
      path: "/neighbourhoods/[slug]",
      location: location as any,
      landingPageConfig,
    },
  };
};

export const getStaticPaths = async () => {
  await $backend.prepare();
  const locationPaths = values($backend.currentSiteLocations)
    .map((location) => ({
      params: { slug: location.slug },
    }))
    .concat(keys(REDIRECTED_SLUGS).map((slug) => ({ params: { slug } })));

  return {
    paths: locationPaths,
    fallback: false,
  };
};
