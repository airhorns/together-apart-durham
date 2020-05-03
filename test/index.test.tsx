import React from "react";
import renderer from "react-test-renderer";
import Index, { getStaticProps } from "../src/pages/index";

it("renders the homepage", async () => {
  const result = await getStaticProps({});
  expect(renderer.create(<Index {...result.props} />).toJSON()).toBeTruthy();
});
