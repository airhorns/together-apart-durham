import React from "react";
import { ParsedUrlQuery } from "querystring";
import { findResultsState } from "react-instantsearch-dom/server";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { ToasterContainer } from "baseui/toast";
import { searchClient, INDEX_NAME, paramsToSearchState } from "./searchClient";
import { styletron, debug } from "../../lib/styletron";
import { FullSearch, FullSearchProps } from "./FullSearch";
import { theme } from "../../lib/theme";

export const ServerSearchApp = (props: FullSearchProps) => (
  <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
    <BaseProvider theme={theme}>
      <ToasterContainer />
      <FullSearch {...props} />
    </BaseProvider>
  </StyletronProvider>
);

export const getSearchServerSideProps = async (params: ParsedUrlQuery) => {
  const searchState = paramsToSearchState(params);
  const resultsState = await findResultsState(ServerSearchApp, {
    indexName: INDEX_NAME,
    searchClient,
    searchState,
  });

  return {
    resultsState: { ...resultsState, state: { ...resultsState.state } }, // the .state key is a real object that next won't serialize
    searchState,
  };
};
