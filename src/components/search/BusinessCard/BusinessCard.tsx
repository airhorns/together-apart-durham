import React from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { Hit } from "react-instantsearch-core";
import { BusinessDoc } from "../BusinessDoc";
import { openSpring, closeSpring } from "../../animations";
import { useScrollConstraints } from "../../hooks/use-scroll-constraints";
import { useWheelScroll } from "../../hooks/use-wheel-scroll";
import { Overlay } from "../Overlay";
import { useStyletron } from "baseui";
import { HeadingLevel } from "baseui/heading";
import { BusinessCardDetails } from "./BusinessCardDetails";
import { useInvertedBorderRadius } from "../../hooks/use-inverted-border-radius";
import { BusinessCardImage } from "./BusinessCardImage";
import { BusinessCardHeader } from "./BusinessCardHeader";

// Distance in pixels a user has to scroll a card down before we recognise a swipe-to dismiss action.
const dismissDistance = 150;

export const BusinessCard = (props: { hit: Hit<BusinessDoc> }) => {
  const [isSelected, setIsSelected] = React.useState(false);

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

  const toggleSelected = React.useCallback(() => {
    setIsSelected((oldValue) => {
      if (oldValue) {
        // selected => deselected
        // Router.back();
      } else {
        // deselected => selected
        // Router.push("/businesses/[slug]", `/businesses/${props.hit.slug}`, { shallow: true });
      }
      return !oldValue;
    });
  }, [props.hit.slug]);

  const checkSwipeToDismiss = React.useCallback(() => {
    return y.get() > dismissDistance && toggleSelected();
  }, [y, toggleSelected]);

  // When this card is selected, attach a wheel event listener
  const containerRef = React.useRef(null);
  useWheelScroll(containerRef, y, constraints, checkSwipeToDismiss, isSelected);

  const [css, $theme] = useStyletron();
  return (
    <HeadingLevel>
      <div className={css({ width: "100%", height: "100%", cursor: "pointer" })} onClick={() => toggleSelected()} ref={containerRef}>
        <div
          className={css({
            width: "100%",
            height: isSelected ? "auto" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            onClick={(event) => {
              if (isSelected) {
                // don't close the card when clicks happen inside it to allow for erroneous clicks beside buttons
                event.stopPropagation();
              }
            }}
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
              <BusinessCardHeader hit={props.hit} highlight isSelected={isSelected} />
              {isSelected && <BusinessCardDetails hit={props.hit} highlight isSelected={isSelected} />}
            </div>
          </motion.div>
        </div>
        <AnimatePresence>{isSelected && <Overlay />}</AnimatePresence>
      </div>
    </HeadingLevel>
  );
};
