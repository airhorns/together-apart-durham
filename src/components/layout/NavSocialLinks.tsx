import React from "react";
import { styled, useStyletron } from "baseui";
import { Row } from "../Row";

const NavSocialLink = styled("a", {
  display: "flex",
  height: "100%",
  alignItems: "center",
  alignSelf: "auto",
  fontSize: "18px",
  color: "#FFF",
});

export const NavSocialLinks = () => {
  const [css, $theme] = useStyletron();

  return (
    <Row>
      <NavSocialLink
        href="https://instagram.com/togetherott"
        target="_blank"
        rel="noopener"
        className={css({ marginRight: $theme.sizing.scale400 })}
      >
        <img src="/images/instagram.svg" width="30" alt="Instagram Logo" />
      </NavSocialLink>
      <NavSocialLink href="https://twitter.com/togetherott" target="_blank" rel="noopener">
        <img src="/images/twitter_white.svg" width="30" alt="Twitter Logo" />
      </NavSocialLink>
    </Row>
  );
};
