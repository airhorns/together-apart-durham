import React from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Hit } from "react-instantsearch-core";
import { Highlight } from "react-instantsearch-dom";
import { BusinessDoc } from "../../../lib/types";
import { openSpring, closeSpring } from "../../animations";
import { useScrollConstraints } from "../../hooks/use-scroll-constraints";
import { useWheelScroll } from "../../hooks/use-wheel-scroll";
import { Router } from "next/router";
import { Overlay } from "../Overlay";
import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { BusinessCardDetails } from "./BusinessCardDetails";
import { useInvertedBorderRadius } from "../../hooks/use-inverted-border-radius";
import { BusinessCardImage } from "./BusinessCardImage";

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
      <div
        className={css({ width: "100%", height: "100%", cursor: "pointer" })}
        onClick={() => setIsSelected(!isSelected)}
        ref={containerRef}
      >
        <AnimatePresence>{isSelected && <Overlay />}</AnimatePresence>
        <div
          className={css({
            width: "100%",
            height: isSelected ? "auto" : "100%",
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
            <BusinessCardImage hit={props.hit} isSelected={isSelected} />
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
              <div className="name-and-category">
                <div className="basic-info-wrap">
                  <p className="category">{props.hit.category}</p>
                </div>
                <div>
                  <Heading
                    $style={{
                      marginTop: $theme.sizing.scale200,
                      marginBottom: $theme.sizing.scale200,
                      ":hover": { textDecoration: "underline" },
                    }}
                  >
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
