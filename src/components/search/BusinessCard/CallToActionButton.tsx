import React from "react";
import { useStyletron } from "baseui";
import { Button, SIZE } from "baseui/button";

const onClick = (event: React.MouseEvent) => event.stopPropagation();

export const CallToActionButton = (props: { name: string; href: string; icon: string; children: React.ReactNode }) => {
  const [_css, $theme] = useStyletron();

  return (
    <Button
      $as="a"
      {...{ href: props.href, target: "_blank", rel: "noopener" }} // psych out typescript to get link props to a tag
      size={SIZE.compact}
      startEnhancer={<img height="25" src={props.icon} alt={`icon for ${props.name}`} />}
      $style={{ marginTop: $theme.sizing.scale300, maxWidth: "350px", width: "100%" }}
      onClick={onClick}
    >
      {props.children}
    </Button>
  );
};
