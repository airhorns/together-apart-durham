import React from "react";
import renderer from "react-test-renderer";
import Page, { getStaticProps } from "../src/pages/submit-a-change";

it("renders the submit a change page", async () => {
  const result = await getStaticProps({});
  expect(renderer.create(<Page {...result.props} />).toJSON()).toBeTruthy();
});
