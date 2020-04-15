import React from "react";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";
import { InstantSearch } from "react-instantsearch-dom";
import { Grid, Cell } from "baseui/layout-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Button, SHAPE } from "baseui/button";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { BusinessCardGrid } from "./BusinessCardGrid";
import { SearchBox } from "./SearchBox";
import {
  RefinementList,
  StaticRefinementList,
  ToggleRefinement,
} from "./RefinementList";
import { ChevronDown } from "baseui/icon";
import { useStyletron } from "baseui";
import { NoResultsIndicator } from "./NoResultsIndicator";

const searchClient = algoliasearch(
  "BP6X6YAZSL",
  "556f6fc163ed52a4034f05ab9f402515"
);

const CATEGORY_REFINEMENT_OPTIONS = [
  "Grocery",
  "Restaurant",
  "Retail",
  "Brewery",
  "Coffee",
  "Other",
].map((value) => ({ value, label: value }));

export const RefinementPane = (props: {
  title: string;
  children: React.ReactNode;
}) => {
  const [css, $theme] = useStyletron();

  return (
    <>
      <div
        className={css({
          display: "none",
          [$theme.mediaQuery.large]: { display: "block" },
        })}
      >
        <HeadingLevel>
          <Heading styleLevel={4}>{props.title}</Heading>
          {props.children}
        </HeadingLevel>
      </div>

      <div
        className={css({
          marginBottom: "1em",
          [$theme.mediaQuery.large]: { display: "none" },
        })}
      >
        <StatefulPopover
          focusLock
          placement={PLACEMENT.bottomLeft}
          content={({ close }) => {
            return (
              <div className={css({ padding: $theme.sizing.scale400 })}>
                {props.children}
              </div>
            );
          }}
        >
          <Button
            kind="secondary"
            shape={SHAPE.pill}
            overrides={{
              BaseButton: { style: { marginRight: $theme.sizing.scale600 } },
            }}
            endEnhancer={() => <ChevronDown size={24} />}
          >
            {props.title}
          </Button>
        </StatefulPopover>
      </div>
    </>
  );
};

export const FullSearch = () => {
  const [css, $theme] = useStyletron();
  return (
    <InstantSearch searchClient={searchClient} indexName="prod_businesses">
      <Grid>
        <Cell span={[4, 8, 12]}>
          <SearchBox />
        </Cell>
        <Cell span={[4, 8, 3]}>
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
            <RefinementPane title="Category">
              <StaticRefinementList
                attribute="category"
                values={CATEGORY_REFINEMENT_OPTIONS}
              />
            </RefinementPane>
            <RefinementPane title="Location">
              <RefinementList attribute="location" />
            </RefinementPane>
            <RefinementPane title="Methods">
              <ToggleRefinement
                attribute="delivery"
                label="Delivery"
                value={true}
              />
              <ToggleRefinement
                attribute="curbside"
                label="Curbside Pickup"
                value={true}
              />
              <ToggleRefinement
                attribute="takeout"
                label="Takeout or In Store Pickup"
                value={true}
              />
            </RefinementPane>
          </div>
        </Cell>
        <Cell span={[4, 8, 9]}>
          <BusinessCardGrid />
          <NoResultsIndicator />
        </Cell>
      </Grid>
    </InstantSearch>
  );
};
