import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-core";

export const ClearRefinements = connectCurrentRefinements(({ items, refine }) => (
  <button onClick={() => refine(items as any)} disabled={!items.length}>
    Clear all refinements
  </button>
));
