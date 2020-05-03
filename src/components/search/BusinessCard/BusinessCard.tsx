import React from "react";
import { Hit } from "react-instantsearch-core";
import { BusinessDoc } from "../BusinessDoc";
import { useStyletron } from "baseui";
import { HeadingLevel } from "baseui/heading";
import { BusinessCardDetails } from "./BusinessCardDetails";
import { BusinessCardImage } from "./BusinessCardImage";
import { BusinessCardHeader } from "./BusinessCardHeader";

export const BusinessCard = (props: { hit: Hit<BusinessDoc> }) => {
  const [css, $theme] = useStyletron();
  return (
    <HeadingLevel>
      <div
        className={css({
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: $theme.borders.radius400,
          overflow: "hidden",
          backgroundColor: "#1f2027",
          width: "100%",
          height: "100%",
          maxWidth: "700px",
        })}
      >
        <BusinessCardImage hit={props.hit} />
        <div
          className={css({
            flexGrow: 1,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            paddingTop: $theme.sizing.scale600,
            paddingBottom: $theme.sizing.scale700,
            paddingLeft: $theme.sizing.scale700,
            paddingRight: $theme.sizing.scale700,
          })}
        >
          <BusinessCardHeader hit={props.hit} highlight isExpanded={true} toggleExpanded={() => null} />
          <BusinessCardDetails hit={props.hit} highlight isExpanded={true} />
        </div>
      </div>
    </HeadingLevel>
  );
};
