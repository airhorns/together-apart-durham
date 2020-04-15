import React from "react";
import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/reset.css";
import { InstantSearch, connectStateResults } from "react-instantsearch-dom";
import { StateResultsProvided } from "react-instantsearch-core";
import { Grid, Cell } from "baseui/layout-grid";
import { Heading, HeadingLevel } from "baseui/heading";
import { Button, SHAPE } from "baseui/button";
import { Drawer, ANCHOR, SIZE } from "baseui/drawer";
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

export const RefinementPane = connectStateResults(
  (
    props: StateResultsProvided & {
      title: string;
      children: React.ReactNode;
      attributes: string[];
    }
  ) => {
    const [css, $theme] = useStyletron();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    console.log(props);
    return (
      <HeadingLevel>
        <div
          className={css({
            display: "none",
            [$theme.mediaQuery.large]: { display: "block" },
          })}
        >
          <Heading styleLevel={4}>{props.title}</Heading>
          {props.children}
        </div>

        <div
          className={css({
            marginBottom: "1em",
            [$theme.mediaQuery.large]: { display: "none" },
          })}
        >
          <Drawer
            isOpen={drawerOpen}
            autoFocus
            renderAll
            onClose={() => setDrawerOpen(false)}
            anchor={ANCHOR.bottom}
            size={SIZE.auto}
          >
            <Heading styleLevel={4}>{props.title}</Heading>
            <div className={css({ padding: $theme.sizing.scale400 })}>
              {props.children}
            </div>
          </Drawer>

          <Button
            kind="secondary"
            shape={SHAPE.pill}
            overrides={{
              BaseButton: { style: { marginRight: $theme.sizing.scale600 } },
            }}
            endEnhancer={() => <ChevronDown size={24} />}
            onClick={() => setDrawerOpen(true)}
          >
            {props.title}
          </Button>
        </div>
      </HeadingLevel>
    );
  }
);

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
            <RefinementPane title="Category" attributes={["category"]}>
              <StaticRefinementList
                attribute="category"
                values={CATEGORY_REFINEMENT_OPTIONS}
              />
            </RefinementPane>
            <RefinementPane title="Location" attributes={["location"]}>
              <RefinementList attribute="location" />
            </RefinementPane>
            <RefinementPane
              title="Delivery Methods"
              attributes={["delivery", "curbside", "takeout"]}
            >
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
