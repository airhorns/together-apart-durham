import React from "react";
import { Hit } from "react-instantsearch-core";
import { useStyletron } from "styletron-react";
import Imgix from "react-imgix";
import { Blurhash } from "react-blurhash/es";
import { webflowToImgixURL } from "../../../lib/utils";
import { BusinessDoc } from "../../../lib/types";
import { useInvertedScale, motion } from "framer-motion";

export const BusinessCardImage = (props: { hit: Hit<BusinessDoc> }) => {
  const [css] = useStyletron();
  const inverted = useInvertedScale();

  return (
    <motion.div
      style={{ ...inverted, originX: 0, originY: 0 }}
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
    </motion.div>
  );
};
