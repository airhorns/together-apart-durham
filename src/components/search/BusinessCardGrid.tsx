import React from "react";
import { connectHits, ScrollTo } from "react-instantsearch-dom";
import { BusinessCard } from "./BusinessCard/BusinessCard";
import { BusinessDoc } from "./BusinessDoc";
import { useStyletron } from "baseui";

export const BusinessCardGrid = connectHits<BusinessDoc>(({ hits }) => {
  const [css, $theme] = useStyletron();
  return (
    <ScrollTo>
      <div
        className={css({
          display: "grid",
          gridAutoColumns: "1fr",
          gridColumnGap: $theme.sizing.scale800,
          gridRowGap: $theme.sizing.scale800,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridTemplateRows: "auto auto",
          marginBottom: $theme.sizing.scale800,
        })}
      >
        {hits.map((hit) => (
          <BusinessCard key={hit.objectID} hit={hit} />
        ))}
      </div>
    </ScrollTo>
  );
});
