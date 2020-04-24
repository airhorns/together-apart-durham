import React from "react";
import { useStyletron } from "baseui";
import { Button, SIZE } from "baseui/button";

const onClick = (event: React.MouseEvent) => event.stopPropagation();

export const CallToActionButton = (props: { name: string; href: string; icon: string; children: React.ReactNode }) => {
  const [css, $theme] = useStyletron();
  // return (
  //   <a href={props.destinationURL} target="_blank" rel="noopener" data-cta={props.name} className="method gift-card-method">
  //     <img
  //       src="https://global-uploads.webflow.com/5e7a31dcdd44a76199b8112d/5e8507072b9389f28bb3ea8f_Gift%20Card%20black.svg"
  //       alt=""
  //       className="icon-image"
  //     />
  //     <div className="method-text-wrapper">
  //       <div className="method-text">Buy a Gift Card</div>
  //     </div>
  //   </a>
  // );

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
