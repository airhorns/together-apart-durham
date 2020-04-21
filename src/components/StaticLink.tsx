import React, { AnchorHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import { pick } from "lodash-es";

export const StaticLink = (props: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) => {
  return (
    <Link {...pick(props, ["href", "as"])}>
      <a {...props} />
    </Link>
  );
};
