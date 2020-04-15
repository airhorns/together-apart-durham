import React from "react";
import {
  RefinementListProvided,
  connectToggleRefinement,
} from "react-instantsearch-core";
import { Highlight, connectRefinementList } from "react-instantsearch-dom";
import { Checkbox } from "baseui/checkbox";
import { Input, SIZE } from "baseui/input";
import { isUndefined, keyBy, concat } from "lodash";
import { useStyletron } from "baseui";
import { Label3 } from "baseui/typography";

export const RefinementOption = (props: {
  item: RefinementListProvided["items"][0];
  onChange: () => void;
  isFromSearch: RefinementListProvided["isFromSearch"];
  showCount?: boolean;
  exclusive?: boolean;
}) => {
  const showCount = isUndefined(props.showCount) ? true : props.showCount;
  const label = (
    <>
      {props.isFromSearch ? (
        <Highlight attribute="label" hit={props.item} />
      ) : (
        props.item.label
      )}{" "}
      {showCount && `(${props.item.count})`}
    </>
  );

  return (
    <Checkbox checked={props.item.isRefined} onChange={props.onChange}>
      {label}
    </Checkbox>
  );
};

export const RefinementList = connectRefinementList(
  (props: RefinementListProvided) => {
    const [css, theme] = useStyletron();
    return (
      <div>
        <div className={css({ marginBottom: theme.sizing.scale200 })}>
          <Input
            size={SIZE.mini}
            type="search"
            placeholder="Search..."
            onChange={(event) =>
              props.searchForItems(event.currentTarget.value)
            }
          />
        </div>
        {props.items.map((item) => (
          <RefinementOption
            key={item.label}
            item={item}
            onChange={() => props.refine(item.value)}
            isFromSearch={props.isFromSearch}
          />
        ))}
        {props.items.length === 0 && <Label3>No matching filters found</Label3>}
      </div>
    );
  }
);

export const StaticRefinementList = connectRefinementList(
  (
    props: {
      values: { value: any; label: string }[];
      exclusive?: boolean;
    } & RefinementListProvided
  ) => {
    const itemsByLabel = keyBy(props.items, "label");
    console.log(props.items);

    return (
      <div>
        {props.values.map((staticItem) => (
          <RefinementOption
            key={staticItem.value}
            item={{
              objectID: staticItem.value,
              count: itemsByLabel[staticItem.label]
                ? itemsByLabel[staticItem.label].count
                : 0,
              isRefined: !!props.currentRefinement.find(
                (item) => item === staticItem.value
              ),
              label: staticItem.label,
              value: [staticItem.value as string],
              _highlightResult: null as any,
            }}
            onChange={() => {
              const value = staticItem.value;
              const next = props.currentRefinement.includes(value)
                ? props.currentRefinement.filter((current) => current !== value)
                : concat(props.currentRefinement, value);
              props.refine(next);
            }}
            isFromSearch={false}
            exclusive={props.exclusive}
          />
        ))}
      </div>
    );
  }
);

interface ToggleProvidedProps {
  currentRefinement: boolean;
  count: { checked: number; unchecked: number };
  refine: (value: boolean) => void;
}
export const ToggleRefinement = connectToggleRefinement(
  (props: ToggleProvidedProps & { label: React.ReactNode }) => {
    return (
      <Checkbox
        checked={props.currentRefinement}
        onChange={(_event) => {
          props.refine(!props.currentRefinement);
        }}
      >
        {props.label}
      </Checkbox>
    );
  }
);
