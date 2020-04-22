import React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { Hit } from "react-instantsearch-core";
import { BusinessDoc } from "../BusinessDoc";
import { RichTextHighlight } from "../RichTextHighlight";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const DeliveryApps: { key: keyof BusinessDoc; label: string }[] = [
  { key: "uber-eats", label: "UberEATS" },
  { key: "grubhub", label: "Grubhub" },
  { key: "postmates", label: "Skip the Dishes" },
  { key: "door-dash", label: "Door Dash" },
  { key: "seamless", label: "Seamless" },
];

export const BusinessCardDetails = (props: { hit: Hit<BusinessDoc>; isSelected: boolean; highlight: boolean }) => {
  const hasDeliveryMethods = props.hit["takeout"] || props.hit["pickup"];
  const hasDeliveryApps = DeliveryApps.some(({ key }) => !!props.hit[key]);
  const [css, $theme] = useStyletron();
  const inverted = useInvertedScale();
  return (
    <motion.div
      style={{ ...inverted, originY: 0, originX: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={css({
        borderTopWidth: "1px",
        borderTopColor: $theme.colors.mono400,
        borderTopStyle: "solid",
        marginTop: "20px",
        paddingTop: "20px",
      })}
    >
      {props.hit.story &&
        (props.highlight ? (
          <RichTextHighlight attribute="story" hit={props.hit} />
        ) : (
          <div className="w-richtext" dangerouslySetInnerHTML={{ __html: props.hit.story }} />
        ))}
      {props.hit["special-instructions"] && (
        <HeadingLevel>
          <div>
            <Heading $style={{ fontSize: "16px" }}>Ordering Instructions</Heading>
            {props.hit["special-instructions"]}
          </div>
        </HeadingLevel>
      )}
      <div className={css({ marginTop: $theme.sizing.scale800 })}>
        <div className="information-wrap">
          {props.hit["website"] && (
            <div className="website-wrap">
              <div className="icon-wrapper">
                <img
                  src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd99487574fbcfc_Website.svg"
                  width="20"
                  alt=""
                />
              </div>
              <div className="info-text-wrapper">
                <a
                  href={props.hit["website"]}
                  target="_blank"
                  rel="noopener"
                  className="info-link url"
                  style={{ textOverflow: "ellipsis", maxWidth: "225px", whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  {props.hit["website"]}
                </a>
              </div>
            </div>
          )}
          {props.hit["phone-number"] && (
            <div className="website-wrap">
              <div className="icon-wrapper">
                <img
                  src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd994d0aa4fbd03_Phone.svg"
                  width="20"
                  alt=""
                />
              </div>
              <div className="info-text-wrapper">
                <a href={`tel:${props.hit["phone-number"]}`} className="info-link">
                  {props.hit["phone-number"]}
                </a>
              </div>
            </div>
          )}
          {hasDeliveryMethods && (
            <div className="website-wrap">
              <div className="icon-wrapper">
                <img
                  src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd99467364fbcf7_Delivery%20Truck.svg"
                  width="20"
                  alt=""
                />
              </div>
              <div className="info-text-wrapper app-wrapper">
                {props.hit["pickup"] && (
                  <span className="info-link app-tile no-pointer">
                    {props.hit.category && props.hit.category[0] === "Restaurant" ? "Takeout" : "In Store Pickup"}
                  </span>
                )}
                {props.hit.delivery && <span className="info-link app-tile no-pointer">Delivery</span>}
              </div>
            </div>
          )}
          {hasDeliveryApps && (
            <div className="website-wrap">
              <div className="icon-wrapper">
                <img
                  src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd9943d5f4fbd05_Phone.svg"
                  width="20"
                  alt=""
                />
              </div>
              <div className="info-text-wrapper app-wrapper">
                {DeliveryApps.map(
                  ({ key, label }) =>
                    props.hit[key] && (
                      <span key={key} className="info-link app-tile no-pointer">
                        {label}
                      </span>
                    )
                )}
              </div>
            </div>
          )}
          <div className="website-wrap socials-wrap">
            {props.hit["twitter-profile"] && (
              <div className="icon-wrapper">
                <a href={props.hit["twitter-profile"]} className="w-inline-block" target="_blank" rel="noopener">
                  <img
                    src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7bac53bdd045c2eac6e495_twitter_white.svg"
                    width="20"
                    alt=""
                    className="image-3"
                  />
                </a>
              </div>
            )}
            {props.hit["facebook-page"] && (
              <div className="icon-wrapper">
                <a href={props.hit["facebook-page"]} className="w-inline-block" target="_blank" rel="noopener">
                  <img
                    src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7bacc673c49866459268aa_facebook.svg"
                    width="20"
                    alt=""
                    className="image-3"
                  />
                </a>
              </div>
            )}
            {props.hit["instagram-profile"] && (
              <div className="icon-wrapper">
                <a href={props.hit["instagram-profile"]} className="w-inline-block" target="_blank" rel="noopener">
                  <img
                    src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e7bad3dd6833502eba9dc9b_instagram.svg"
                    width="20"
                    alt=""
                    className="image-3"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
