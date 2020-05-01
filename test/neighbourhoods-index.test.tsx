import React from "react";
import renderer from "react-test-renderer";
import Page, { getStaticProps } from "../src/pages/neighbourhoods/index";

it("renders the all neighbourhoods page", async () => {
  const result = await getStaticProps({});
  expect(renderer.create(<Page {...result.props} />).toJSON()).toBeTruthy();
});
