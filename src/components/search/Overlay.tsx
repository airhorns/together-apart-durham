import React from "react";
import { motion } from "framer-motion";
import { StaticLink } from "../StaticLink";
import { useStyletron } from "baseui";

export const Overlay = (props: { isSelected: boolean }) => {
  const [css] = useStyletron();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: props.isSelected ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: props.isSelected ? "auto" : "none" }}
      className={css({
        zIndex: 1,
        position: "fixed",
        background: "rgba(0, 0, 0, 0.8)",
        willChange: "opacity",
        top: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
      })}
    >
      <StaticLink href="/" />
    </motion.div>
  );
};
