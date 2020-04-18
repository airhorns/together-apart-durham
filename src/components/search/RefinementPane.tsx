import React from "react";
import { InstantSearch, connectStateResults } from "react-instantsearch-dom";
import { StateResultsProvided } from "react-instantsearch-core";
import { Heading, HeadingLevel } from "baseui/heading";
import { Button, SHAPE } from "baseui/button";
import { Drawer, ANCHOR, SIZE } from "baseui/drawer";
import { ChevronDown } from "baseui/icon";
import { useStyletron } from "baseui";
import { searchClient, INDEX_NAME } from "./searchClient";
import { compact } from "lodash-es";

export const RefinementPane = connectStateResults(
  (
    props: StateResultsProvided & {
      title: string;
      children: React.ReactNode;
      attributes: string[];
      searchState: any;
      onSearchStateChange: (newState: any) => void;
      className?: string;
    }
  ) => {
    const [css, $theme] = useStyletron();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const allRefinements: { [key: string]: string[] } = props.searchState.refinementList || {};
    const refinementCount = compact(props.attributes.flatMap((attribute) => allRefinements[attribute])).length;
    return (
      <div className={props.className}>
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
            <Drawer isOpen={drawerOpen} autoFocus onClose={() => setDrawerOpen(false)} anchor={ANCHOR.bottom} size={SIZE.auto}>
              <Heading styleLevel={4}>{props.title}</Heading>
              <div className={css({ padding: $theme.sizing.scale400 })}>
                {/* This fuckery is in order to support persisting the Algolia search state when these inner components unmount. See https://github.com/algolia/react-instantsearch/issues/892 and https://www.algolia.com/doc/guides/building-search-ui/going-further/native/react/ for more information */}
                <InstantSearch
                  searchClient={searchClient}
                  indexName={INDEX_NAME}
                  searchState={props.searchState}
                  onSearchStateChange={props.onSearchStateChange}
                >
                  {props.children}
                </InstantSearch>
              </div>
            </Drawer>

            <Button
              kind="secondary"
              shape={SHAPE.pill}
              overrides={{
                BaseButton: {
                  style: {
                    marginRight: $theme.sizing.scale600,
                    whiteSpace: "nowrap",
                    fontWeight: refinementCount > 0 ? "bold" : undefined,
                  },
                },
              }}
              endEnhancer={() => <ChevronDown size={24} />}
              onClick={() => setDrawerOpen(true)}
            >
              {props.title} {refinementCount > 0 && `(${refinementCount})`}
            </Button>
          </div>
        </HeadingLevel>
      </div>
    );
  }
);
