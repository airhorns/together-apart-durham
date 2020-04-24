import React from "react";
import { useStyletron, styled } from "baseui";
import { Row } from "../../Row";

export const IconWrapper = styled("div", ({ $theme }) => ({ color: "#FFF", padding: $theme.sizing.scale100, minWidth: "30px" }));

export const IconDetail = (props: { icon: string; children: React.ReactNode }) => {
  const [css, $theme] = useStyletron();

  return (
    <Row>
      <IconWrapper>
        <img src={props.icon} width="20" alt="" />
      </IconWrapper>
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          alignItems: "center",
          flex: 1,
          marginLeft: $theme.sizing.scale200,
          color: "#FFF",
          textDecoration: "none",
        })}
      >
        {props.children}
      </div>
    </Row>
  );
};
