import React from "react";
import Router from "next/router";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import { Grid, Cell } from "baseui/layout-grid";
import { BusinessCardGrid } from "./BusinessCardGrid";
import { SearchBox } from "./SearchBox";
import { RefinementList, StaticRefinementList, ToggleRefinement } from "./RefinementList";
import { useStyletron } from "baseui";
import { NoResultsIndicator } from "./NoResultsIndicator";
import { RefinementPane } from "./RefinementPane";
import { searchClient, searchStateToURL, INDEX_NAME } from "./searchClient";
import { Pagination } from "./Pagination";
import { isUndefined, debounce } from "lodash-es";
import { ClearRefinements } from "./ClearRefinements";
import { HeadingLevel } from "baseui/heading";
import { BusinessDocFetchAttributes } from "./BusinessDoc";

const CATEGORY_REFINEMENT_OPTIONS = ["Brewery", "Coffee", "Grocery", "Restaurant", "Retail", "Other"].map((value) => ({
  value,
  label: value,
}));

export interface FullSearchProps {
  resultsState?: any;
  searchState?: any;
  baseFilters?: string;
  showNeighbourhoodFacets?: boolean;
  path: string;
}

export const FullSearch = (props: FullSearchProps) => {
  const [css, $theme] = useStyletron();
  const [searchState, setSearchState] = React.useState(props.searchState || {});

  const updateURL = React.useMemo(() => debounce((href: string) => Router.push(props.path, href, { shallow: true }), 1000), [props.path]);

  const controlledSearchStateProps = {
    searchState,
    onSearchStateChange: React.useCallback(
      (newState) => {
        setSearchState(newState);
        updateURL(searchStateToURL(newState));
      },
      [updateURL]
    ),
  };

  const shownNeighbourhoodFacets = isUndefined(props.showNeighbourhoodFacets) ? true : props.showNeighbourhoodFacets;

  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME} resultsState={props.resultsState} {...controlledSearchStateProps}>
      <Configure
        filters={props.baseFilters}
        attributesToRetrieve={BusinessDocFetchAttributes}
        attributesToHighlight={["name", "story"]}
        distinct
        hitsPerPage={18}
      />
      <Grid gridMargins={0}>
        <Cell span={[4, 8, 12]}>
          <SearchBox />
        </Cell>
        <Cell span={[4, 8, 3]}>
          <HeadingLevel>
            <div
              className={css({
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll",
                [$theme.mediaQuery.large]: {
                  flexDirection: "column",
                  overflowX: "auto",
                },
              })}
            >
              <RefinementPane title="Category" attributes={["category"]} {...controlledSearchStateProps}>
                <StaticRefinementList attribute="category" values={CATEGORY_REFINEMENT_OPTIONS} />
              </RefinementPane>
              <RefinementPane
                title="Neighbourhood"
                attributes={["location"]}
                {...controlledSearchStateProps}
                className={css({ display: shownNeighbourhoodFacets ? "auto" : "none" })}
              >
                <RefinementList attribute="location" />
              </RefinementPane>
              <RefinementPane title="Delivery Methods" attributes={["delivery", "pickup"]} {...controlledSearchStateProps}>
                <ToggleRefinement attribute="delivery" label="Delivery" value={true} />
                <ToggleRefinement attribute="pickup" label="Takeout or Pickup" value={true} />
              </RefinementPane>
              <ClearRefinements />
            </div>
          </HeadingLevel>
        </Cell>
        <Cell span={[4, 8, 9]}>
          <BusinessCardGrid />
          <NoResultsIndicator />
        </Cell>
        <Cell span={[4, 8, 12]}>
          <div className={css({ display: "flex", justifyContent: "center" })}>
            <Pagination />
          </div>
        </Cell>
      </Grid>
    </InstantSearch>
  );
};
