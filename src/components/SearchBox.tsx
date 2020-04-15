import React from "react";
import { connectSearchBox, connectStateResults } from "react-instantsearch-dom";
import { StateResultsProvided } from "react-instantsearch-core";
import { Input } from "baseui/input";
import { Search, Delete } from "baseui/icon";
import { useStyletron } from "baseui";
import { Spinner } from "baseui/spinner";

const SearchBefore = () => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.sizing.scale500,
      })}
    >
      <Search size="18px" />
    </div>
  );
};

const SearchDecorations = connectStateResults((props: StateResultsProvided) => {
  const [css, theme] = useStyletron();
  const hasQuery =
    props.searchState.query && props.searchState.query.length > 0;
  return (
    <>
      <div
        className={css({
          marginLeft: "1em",
          marginRight: "1em",
          minWidth: "40px",
          flexGrow: 0,
          flexShrink: 0,
        })}
      >
        {props.isSearchStalled && <Spinner />}
      </div>
      {hasQuery && (
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            paddingLeft: theme.sizing.scale500,
            paddingRight: theme.sizing.scale500,
          })}
        >
          <Delete size="18px" />
        </div>
      )}
    </>
  );
});

const SearchAfter = (props: {}) => {
  return <SearchDecorations />;
};

export const SearchBox = connectSearchBox(
  ({ currentRefinement, refine, isSearchStalled }) => {
    const [css] = useStyletron();
    return (
      <div
        className={css({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "1em",
        })}
      >
        <Input
          type="search"
          size="large"
          placeholder="Search by anything..."
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
          overrides={{ Before: SearchBefore, After: SearchAfter }}
        />
      </div>
    );
  }
);
