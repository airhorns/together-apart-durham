import React, { AnchorHTMLAttributes } from "react";
import Linker, { LinkProps } from "next/link";
import { pick } from "lodash-es";

export const StaticLink = (
  props: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps
) => {
  return (
    <Linker {...pick(props, ["href", "as"])}>
      <a {...props} />
    </Linker>
  );
};
