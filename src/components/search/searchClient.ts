import algoliasearch from "algoliasearch/lite";
import querystring from "qs"; // use qs and not query-string cause it supports nested object serialization which algolia search states require
import { assert } from "../../lib/utils";
import { CurrentSite } from "../../lib/sites";
import { omit } from "lodash-es";

export const searchClient = algoliasearch(assert(process.env.ALGOLIA_APP_ID), assert(CurrentSite.algoliaAPIKey));

export const INDEX_NAME = "prod_businesses";

export type SearchState = { [key: string]: any };

export const createURL = (state: SearchState) => `?${querystring.stringify(state)}`;
export const paramsToSearchState = (params: any): SearchState => params;

export const pathToSearchState = (path: string): SearchState =>
  path.includes("?") ? paramsToSearchState(querystring.parse(path.substring(path.indexOf("?") + 1))) : {};

export const searchStateToURL = (searchState: SearchState) => {
  const segments = [window.location.pathname];
  if (searchState) {
    const params = omit(searchState, "configure");
    if (params.page == 1) {
      delete params.page;
    }
    if (params.query == "") {
      delete params.query;
    }
    if (Object.keys(params).length > 0) {
      segments.push("?" + querystring.stringify(params));
    }
  }
  return segments.join("");
};
