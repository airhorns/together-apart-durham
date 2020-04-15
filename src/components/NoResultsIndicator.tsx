import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import { StateResultsProvided } from "react-instantsearch-core";
import { useStyletron } from "baseui";
import { Label1, Paragraph1 } from "baseui/typography";

export const NoResultsIndicator = connectStateResults(
  (props: StateResultsProvided) => {
    const [css] = useStyletron();
    if (props.searchResults && props.searchResults.nbHits === 0) {
      return (
        <div
          className={css({
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          })}
        >
          <Label1 marginBottom="scale500">
            No listings found for search "{props.searchState.query}".
          </Label1>
          <Paragraph1>
            Add more businesses to this page by{" "}
            <a href="/submit-a-business">submitting them here</a>!
          </Paragraph1>
        </div>
      );
    } else {
      return null;
    }
  }
);
