import React from "react";
import { connectHits, ScrollTo } from "react-instantsearch-dom";
import { BusinessCard } from "./BusinessCard";
import { BusinessDoc } from "./BusinessDoc";

export const BusinessCardGrid = connectHits<BusinessDoc>(({ hits }) => {
  return (
    <div className="w-dyn-list">
      <ScrollTo>
        <div className="business-list w-dyn-items">
          {hits.map((hit) => (
            <BusinessCard key={hit.objectID} hit={hit} />
          ))}
        </div>
      </ScrollTo>
    </div>
  );
});
