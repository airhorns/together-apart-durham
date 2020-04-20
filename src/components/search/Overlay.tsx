import React from "react";
import { motion } from "framer-motion";
import { StaticLink } from "../StaticLink";
import { useStyletron } from "baseui";

export const Overlay = () => {
  const [css] = useStyletron();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
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
