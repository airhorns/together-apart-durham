import { createURL, pathToSearchState } from "../src/components/search/searchClient";

it("generates the same path from search states", () => {
  let state = {};
  expect(pathToSearchState(createURL(state))).toEqual(state);

  state = { page: "1" };
  expect(pathToSearchState(createURL(state))).toEqual(state);

  state = { page: "1", refinementList: { category: ["foo"] } };
  expect(pathToSearchState(createURL(state))).toEqual(state);
});
