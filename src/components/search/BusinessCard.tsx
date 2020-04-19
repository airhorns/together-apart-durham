import React from "react";
import { motion, useMotionValue, useInvertedScale } from "framer-motion";
import { Hit } from "react-instantsearch-core";
import { Highlight } from "react-instantsearch-dom";
import { Blurhash } from "react-blurhash/es";
import Imgix from "react-imgix";
import { webflowToImgixURL } from "../../lib/utils";
import { BusinessDoc } from "./BusinessDoc";
import { openSpring, closeSpring } from "../animations";
import { RichTextHighlight } from "./RichTextHighlight";
import { useInvertedBorderRadius } from "../hooks/use-inverted-border-radius";
import { useScrollConstraints } from "../hooks/use-scroll-constraints";
import { useWheelScroll } from "../hooks/use-wheel-scroll";
import { Router } from "next/router";
import { Overlay } from "./Overlay";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const DeliveryApps: { key: keyof BusinessDoc; label: string }[] = [
  { key: "uber-eats", label: "UberEATS" },
  { key: "grubhub", label: "Grubhub" },
  { key: "postmates", label: "Skip the Dishes" },
  { key: "door-dash", label: "Door Dash" },
  { key: "seamless", label: "Seamless" },
];

export const BusinessCardDetails = (props: { hit: Hit<BusinessDoc>; isSelected: boolean }) => {
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
      {props.hit.story && <RichTextHighlight attribute="story" hit={props.hit} />}
      {props.hit["special-instructions"] && (
        <HeadingLevel>
          <div>
            <Heading>Ordering Instructions</Heading>
            {props.hit["special-instructions"]}
          </div>
        </HeadingLevel>
      )}
      <div className="delivery-options">
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
                    {props.hit.category === "Restaurant" ? "Takeout" : "In Store Pickup"}
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

// Distance in pixels a user has to scroll a card down before we recognise a swipe-to dismiss action.
const dismissDistance = 150;

export const BusinessCard = (props: { hit: Hit<BusinessDoc> }) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const hasMethods =
    props.hit["gift-card-link"] || props.hit["online-store-link"] || props.hit["online-order-link"] || props.hit["dontations-link"];

  // Nice card poppy outty animation from https://codesandbox.io/s/app-store-ui-using-react-and-framer-motion-ecgc2
  const y = useMotionValue(0);
  const zIndex = useMotionValue(isSelected ? 2 : 0);

  // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
  const inverted = useInvertedBorderRadius(20);

  // We'll use the opened card element to calculate the scroll constraints
  const cardRef = React.useRef(null);
  const constraints = useScrollConstraints(cardRef, isSelected);

  const checkZIndex = React.useCallback(
    (latest) => {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    },
    [zIndex, isSelected]
  );

  const checkSwipeToDismiss = React.useCallback(() => {
    return y.get() > dismissDistance && (Router as any).back();
  }, [y]);

  // When this card is selected, attach a wheel event listener
  const containerRef = React.useRef(null);
  useWheelScroll(containerRef, y, constraints, checkSwipeToDismiss, isSelected);

  const [css, $theme] = useStyletron();
  return (
    <HeadingLevel>
      <div className={css({ width: "100%", height: "100%" })} onClick={() => setIsSelected(!isSelected)} ref={containerRef}>
        <Overlay isSelected={isSelected} />
        <div
          className={css({
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: isSelected ? "fixed" : "relative",
            zIndex: isSelected ? 2 : "auto",
            paddingTop: isSelected ? $theme.sizing.scale1600 : 0,
            paddingBottom: isSelected ? $theme.sizing.scale1600 : 0,
            top: 0,
            left: 0,
            right: 0,
          })}
        >
          <motion.div
            ref={cardRef}
            style={{ ...inverted, y, zIndex, originY: 0, originX: 0 }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
            className={css({
              position: "relative",
              display: "flex",
              flexDirection: "column",
              borderRadius: $theme.borders.radius400,
              overflow: "hidden",
              backgroundColor: "#1f2027",
              width: "100%",
              height: isSelected ? "auto" : "100%",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            })}
          >
            <div
              className={css({
                width: "100%",
                height: "250px",
                flexGrow: 0,
                flexShrink: 0,
                zIndex: 0,
              })}
            >
              {props.hit["image-blurhash"] && (
                <div style={{ position: "absolute", top: 0, left: 0 }}>
                  <Blurhash
                    hash={props.hit["image-blurhash"]}
                    width={700}
                    height={250}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    style={{ zIndex: 1 }}
                  />
                </div>
              )}
              <Imgix
                src={webflowToImgixURL(props.hit.header_image)}
                className={css({
                  width: "100%",
                  height: "100%",
                  position: "relative", // necessary to put this element's zIndex on the same playing field as the blurhashes
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                  zIndex: 2,
                })}
                sizes="100vw"
                htmlAttributes={{ alt: `Goods or services from ${props.hit.name}`, loading: "lazy" }}
              />
            </div>
            <div
              className={css({
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "25px",
                paddingBottom: "25px",
                paddingLeft: "20px",
                paddingRight: "20px",
              })}
            >
              <div className="name-and-category">
                <div className="basic-info-wrap">
                  <p className="category">{props.hit.category}</p>
                </div>
                <div>
                  <Heading $style={{ marginTop: $theme.sizing.scale200, marginBottom: $theme.sizing.scale200 }}>
                    <Highlight attribute="name" hit={props.hit} tagName="mark" />
                  </Heading>
                  <p className="location">{props.hit.location}</p>
                </div>
              </div>
              {hasMethods && (
                <div className="support-methods">
                  {props.hit["gift-card-link"] && (
                    <a href={props.hit["gift-card-link"]} target="_blank" rel="noopener" className="method gift-card-method w-inline-block">
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507072b9389f28bb3ea8f_Gift%20Card%20black.svg"
                        alt=""
                        className="icon-image"
                      />
                      <div className="method-text-wrapper">
                        <div className="method-text gc">Buy a Gift Card</div>
                      </div>
                    </a>
                  )}
                  {props.hit["online-store-link"] && (
                    <a
                      href={props.hit["online-store-link"]}
                      target="_blank"
                      rel="noopener"
                      className="method shop-online-method w-inline-block"
                    >
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e850708db1f6e2a6d8bdcc1_order-online%20black.svg"
                        alt=""
                        className="icon-image"
                      />
                      <p className="method-text">Shop Online</p>
                    </a>
                  )}
                  {props.hit["online-order-link"] && (
                    <a
                      href={props.hit["online-order-link"]}
                      target="_blank"
                      rel="noopener"
                      className="method order-food-method w-inline-block"
                    >
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507079550ef265edc1c40_Order%20To%20Go%20black.svg"
                        alt=""
                        className="icon-image"
                      />
                      <p className="method-text">Order Food</p>
                    </a>
                  )}
                  {props.hit["dontations-link"] && (
                    <a href={props.hit["dontations-link"]} target="_blank" rel="noopener" className="method donate-method w-inline-block">
                      <img
                        src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8508fcf6f6ed08173c5ddb_donate-black%3F.svg"
                        alt=""
                        className="icon-image"
                      />
                      <p className="method-text">Donate Online</p>
                    </a>
                  )}
                </div>
              )}
              {isSelected && <BusinessCardDetails {...props} isSelected={isSelected} />}
            </div>
          </motion.div>
        </div>
      </div>
    </HeadingLevel>
  );
};
