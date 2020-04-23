import React from "react";
import { Hit } from "react-instantsearch-core";
import { motion } from "framer-motion";
import { BusinessDoc } from "../BusinessDoc";
import { useStyletron } from "baseui";
import { HeadingLevel } from "baseui/heading";
import { BusinessCardDetails } from "./BusinessCardDetails";
import { BusinessCardImage } from "./BusinessCardImage";
import { BusinessCardHeader } from "./BusinessCardHeader";

export const StaticBusinessCard = (props: { hit: Hit<BusinessDoc> }) => {
  const [css, $theme] = useStyletron();
  return (
    <HeadingLevel>
      <motion.div
        className={css({
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: $theme.borders.radius400,
          overflow: "hidden",
          backgroundColor: "#1f2027",
          width: "100%",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
        })}
      >
        <BusinessCardImage hit={props.hit} />
        <div
          className={css({
            flexGrow: 1,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: $theme.sizing.scale600,
            paddingBottom: $theme.sizing.scale700,
            paddingLeft: $theme.sizing.scale700,
            paddingRight: $theme.sizing.scale700,
          })}
        >
          <BusinessCardHeader hit={props.hit} highlight={false} isSelected={true} toggleSelected={() => null} />
          <BusinessCardDetails hit={props.hit} highlight={false} isSelected={true} />
        </div>
      </motion.div>
    </HeadingLevel>
  );
};
