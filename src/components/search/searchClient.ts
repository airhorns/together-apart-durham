import algoliasearch from "algoliasearch/lite";
import querystring from "qs"; // use qs and not query-string cause it supports nested object serialization which algolia search states require
import { assert } from "../../lib/utils";
import { CurrentSite } from "../../lib/sites";

export const searchClient = algoliasearch(assert(process.env.ALGOLIA_APP_ID), assert(CurrentSite.algoliaAPIKey));

export const INDEX_NAME = "prod_businesses";

export type SearchState = { [key: string]: any };

export const createURL = (state: SearchState) => `?${querystring.stringify(state)}`;
export const paramsToSearchState = (params: any): SearchState => params;

export const pathToSearchState = (path: string): SearchState =>
  path.includes("?") ? paramsToSearchState(querystring.parse(path.substring(path.indexOf("?") + 1))) : {};

export const searchStateToURL = (searchState: SearchState) =>
  searchState ? `${window.location.pathname}?${querystring.stringify(searchState)}` : "";
