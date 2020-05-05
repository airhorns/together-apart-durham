import React from "react";
import { connectSearchBox, connectStateResults } from "react-instantsearch-dom";
import { connectCurrentRefinements } from "react-instantsearch-core";
import { StateResultsProvided } from "react-instantsearch-core";
import { Input } from "baseui/input";
import { Search, Delete } from "baseui/icon";
import { useStyletron } from "baseui";
import { StyledSpinnerNext } from "baseui/spinner";
import { Row } from "../Row";

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

const ClearInputButton = connectCurrentRefinements(({ items, refine }) => {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.sizing.scale500,
        paddingRight: theme.sizing.scale500,
        cursor: "pointer",
      })}
      onClick={() => refine(items as any)}
    >
      <Delete size="18px" />
    </div>
  );
});

const SearchDecorations = connectStateResults((props: StateResultsProvided) => {
  const [css] = useStyletron();
  const hasQuery = props.searchState.query && props.searchState.query.length > 0;
  return (
    <Row>
      <div
        className={css({
          marginLeft: "1em",
          marginRight: "1em",
          minWidth: "40px",
          flexGrow: 0,
          flexShrink: 0,
        })}
      >
        {props.isSearchStalled && <StyledSpinnerNext />}
      </div>
      {hasQuery && <ClearInputButton clearsQuery />}
    </Row>
  );
});

const SearchAfter = (_props: {}) => {
  return <SearchDecorations />;
};

export const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  const [css, $theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: $theme.sizing.scale600,
        [$theme.mediaQuery.large]: {
          marginBottom: $theme.sizing.scale800,
        },
      })}
    >
      <Input
        type="search"
        size="large"
        placeholder="Search for shops, products, restaurants ... "
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        overrides={{ Before: SearchBefore, After: SearchAfter }}
        id="search-query"
      />
    </div>
  );
});
