import algoliasearch from "algoliasearch/lite";
import qs from "qs";

export const searchClient = algoliasearch(
  "BP6X6YAZSL",
  "556f6fc163ed52a4034f05ab9f402515"
);

export const INDEX_NAME = "prod_businesses";

export const createURL = (state: any) => `?${qs.stringify(state)}`;
export const paramsToSearchState = (params: any) => params;

export const pathToSearchState = (path: string) =>
  path.includes("?")
    ? paramsToSearchState(qs.parse(path.substring(path.indexOf("?") + 1)))
    : {};

export const searchStateToURL = (searchState: any) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";
