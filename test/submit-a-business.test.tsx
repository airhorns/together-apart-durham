import React from "react";
import renderer from "react-test-renderer";
import Page, { getStaticProps } from "../src/pages/submit-a-business";

it("renders the submit a business page", async () => {
  const result = await getStaticProps({});
  expect(renderer.create(<Page {...result.props} />).toJSON()).toBeTruthy();
});
