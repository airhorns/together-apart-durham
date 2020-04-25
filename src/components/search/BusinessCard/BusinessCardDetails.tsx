import React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { Hit } from "react-instantsearch-core";
import { BusinessDoc } from "../BusinessDoc";
import { RichTextHighlight } from "../RichTextHighlight";
import { useStyletron, styled } from "baseui";
import { StatefulPopover } from "baseui/popover";
import { Button, KIND, SIZE } from "baseui/button";
import { Heading } from "baseui/heading";
import { IconDetail, IconWrapper } from "./IconDetail";
import { Block } from "baseui/block";

const DeliveryApps: { key: keyof BusinessDoc; label: string }[] = [
  { key: "uber-eats", label: "UberEATS" },
  { key: "grubhub", label: "Grubhub" },
  { key: "postmates", label: "Skip the Dishes" },
  { key: "door-dash", label: "Door Dash" },
  { key: "seamless", label: "Seamless" },
];

const InfoBadge = styled("span", ({ $theme }) => ({
  marginRight: $theme.sizing.scale100,
  marginTop: $theme.sizing.scale100,
  marginBottom: $theme.sizing.scale100,
  padding: "2px 5px",
  color: "#FFF",
  border: "1px solid #f2c94c",
  borderRadius: $theme.borders.radius300,
  fontSize: "12px",
  cursor: "default",
}));

export const BusinessCardDetails = (props: { hit: Hit<BusinessDoc>; isExpanded: boolean; highlight: boolean }) => {
  const hasDeliveryMethods = props.hit["takeout"] || props.hit["pickup"];
  const hasDeliveryApps = DeliveryApps.some(({ key }) => !!props.hit[key]);
  const [css, $theme] = useStyletron();
  const inverted = useInvertedScale();

  const infoLinkStyle = css({
    color: "#FFF",
    textDecoration: "none",
    fontSize: "14px",
  });

  return (
    <motion.div
      style={{ ...inverted, originY: 0, originX: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={css({
        marginTop: $theme.sizing.scale800,
      })}
    >
      {props.hit.story &&
        (props.highlight ? (
          <RichTextHighlight attribute="story" hit={props.hit} />
        ) : (
          <div className="webflow-richtext" dangerouslySetInnerHTML={{ __html: props.hit.story }} />
        ))}

      <div className={css({ marginTop: $theme.sizing.scale800 })}>
        <div className={css({ display: "flex", flexDirection: "column" })}>
          {props.hit["special-instructions"] && (
            <StatefulPopover
              content={() => (
                <Block padding="20px" maxWidth="700px">
                  <Heading $style={{ fontSize: "16px" }}>Ordering Instructions</Heading>
                  {props.hit["special-instructions"]}
                </Block>
              )}
              returnFocus
              autoFocus
            >
              <Button kind={KIND.minimal} size={SIZE.compact}>
                Ordering Instructions
              </Button>
            </StatefulPopover>
          )}
          {props.hit["website"] && (
            <IconDetail icon={require("../../../assets/images/Website.svg")}>
              <a
                href={props.hit["website"]}
                target="_blank"
                rel="noopener"
                style={{ textOverflow: "ellipsis", maxWidth: "225px", whiteSpace: "nowrap", overflow: "hidden" }}
                className={infoLinkStyle}
              >
                {props.hit["website"]}
              </a>
            </IconDetail>
          )}
          {props.hit["phone-number"] && (
            <IconDetail icon={require("../../../assets/images/Phone.svg")}>
              <a href={`tel:${props.hit["phone-number"]}`} className={infoLinkStyle}>
                {props.hit["phone-number"]}
              </a>
            </IconDetail>
          )}
          {hasDeliveryMethods && (
            <IconDetail icon={require("../../../assets/images/Delivery-Truck.svg")}>
              {props.hit["pickup"] && (
                <InfoBadge>{props.hit.category && props.hit.category[0] === "Restaurant" ? "Takeout" : "In Store Pickup"}</InfoBadge>
              )}
              {props.hit.delivery && <InfoBadge>Delivery</InfoBadge>}
            </IconDetail>
          )}
          {hasDeliveryApps && (
            <IconDetail icon={require("../../../assets/images/Smartphone.svg")}>
              {DeliveryApps.map(({ key, label }) => props.hit[key] && <InfoBadge key={key}>{label}</InfoBadge>)}
            </IconDetail>
          )}

          <div className={css({ display: "flex" })}>
            {props.hit["twitter-profile"] && (
              <IconWrapper>
                <a href={props.hit["twitter-profile"]} target="_blank" rel="noopener">
                  <img src={require("../../../assets/images/twitter_white.svg")} width="20" alt="Twitter logo" />
                </a>
              </IconWrapper>
            )}
            {props.hit["facebook-page"] && (
              <IconWrapper>
                <a href={props.hit["facebook-page"]} target="_blank" rel="noopener">
                  <img src={require("../../../assets/images/facebook.svg")} width="20" alt="Facebook logo" />
                </a>
              </IconWrapper>
            )}
            {props.hit["instagram-profile"] && (
              <IconWrapper>
                <a href={props.hit["instagram-profile"]} target="_blank" rel="noopener">
                  <img src={require("../../../assets/images/instagram.svg")} width="20" alt="Instagram logo" />
                </a>
              </IconWrapper>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
