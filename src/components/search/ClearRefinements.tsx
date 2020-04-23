import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-core";
import { Button, SHAPE } from "baseui/button";
import { useStyletron } from "baseui";

export const ClearRefinements = connectCurrentRefinements(({ items, refine }) => {
  const [css, $theme] = useStyletron();
  return (
    <Button
      data-testid="clear-refinements"
      kind="secondary"
      shape={SHAPE.pill}
      onClick={() => refine(items as any)}
      disabled={!items.length}
      $style={{ whiteSpace: "nowrap", marginBottom: "1em", [$theme.mediaQuery.large]: { marginTop: $theme.sizing.scale400 } }}
    >
      Clear filters
    </Button>
  );
});
