import React from "react";
import { connectHighlight } from "react-instantsearch-dom";

export const RichTextHighlight = connectHighlight(
  ({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
      highlightProperty: "_highlightResult",
      attribute,
      hit,
    });

    const html = parsedHit
      .map((part) =>
        part.isHighlighted ? `<mark>${part.value}</mark>` : part.value
      )
      .join("");

    return (
      <div className="w-richtext" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
);
