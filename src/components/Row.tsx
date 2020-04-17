import React from "react";
import { BlockProps, Block } from "baseui/block";

export const Row = (props: BlockProps) => (
  <Block display="flex" flexDirection="row" alignItems="center" {...props}>
    {props.children}
  </Block>
);
