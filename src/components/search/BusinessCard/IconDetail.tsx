import React from "react";
import { useStyletron, styled } from "baseui";
import { Row } from "../../Row";

export const IconWrapper = styled("div", ({ $theme }) => ({ flex: 0, color: "#FFF", padding: $theme.sizing.scale100, minWidth: "30px" }));

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
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: 0,
          marginLeft: $theme.sizing.scale200,
          color: "#FFF",
          textDecoration: "none",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        })}
      >
        {props.children}
      </div>
    </Row>
  );
};
