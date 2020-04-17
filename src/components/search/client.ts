import algoliasearch from "algoliasearch/lite";
import querystring from "query-string";

export const searchClient = algoliasearch("BP6X6YAZSL", "556f6fc163ed52a4034f05ab9f402515");

export const INDEX_NAME = "prod_businesses";

export const createURL = (state: any) => `?${querystring.stringify(state)}`;
export const paramsToSearchState = (params: any) => params;

export const pathToSearchState = (path: string) =>
  path.includes("?") ? paramsToSearchState(querystring.parse(path.substring(path.indexOf("?") + 1))) : {};

export const searchStateToURL = (searchState: any) =>
  searchState ? `${window.location.pathname}?${querystring.stringify(searchState)}` : "";
