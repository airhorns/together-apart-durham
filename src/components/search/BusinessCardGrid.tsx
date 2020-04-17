import React from "react";
import { connectHits } from "react-instantsearch-dom";
import { BusinessCard } from "./BusinessCard";
import { BusinessDoc } from "../../lib/types";

export const BusinessCardGrid = connectHits<BusinessDoc>(({ hits }) => {
  return (
    <div className="w-dyn-list">
      <div className="business-list w-dyn-items">
        {hits.map((hit) => (
          <BusinessCard key={hit.objectID} hit={hit} />
        ))}
      </div>
    </div>
  );
});
