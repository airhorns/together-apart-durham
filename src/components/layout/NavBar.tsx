import React from "react";
import { StaticLink } from "../StaticLink";
import { CurrentSite } from "../../lib/sites";
import { useStyletron } from "baseui";
import { Row } from "../Row";
import { NavSocialLinks } from "./NavSocialLinks";

export const NavBar = (props: { coBrand?: React.ReactNode }) => {
  const [css, $theme] = useStyletron();
  return (
    <div className={css({ paddingTop: $theme.sizing.scale1200, [$theme.mediaQuery.medium]: { paddingBottom: $theme.sizing.scale700 } })}>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          [$theme.mediaQuery.medium]: { flexDirection: "row" },
        })}
      >
        <div
          className={css({
            color: $theme.colors.white,
            textDecoration: "none",
            flexDirection: "row",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <StaticLink href="/" aria-current="page">
            <img src={CurrentSite.logoImageURL} width="159" alt="Logo" />
          </StaticLink>
          {props.coBrand && (
            <div className={css({ display: "flex", marginLeft: $theme.sizing.scale400, marginRight: $theme.sizing.scale400 })}>
              {props.coBrand}
            </div>
          )}
        </div>

        <Row>
          <StaticLink
            href="/submit-a-business"
            className={css({
              marginRight: $theme.sizing.scale700,
              paddingTop: $theme.sizing.scale300,
              paddingBottom: $theme.sizing.scale300,
              paddingLeft: $theme.sizing.scale600,
              paddingRight: $theme.sizing.scale600,
              [$theme.mediaQuery.small]: {
                fontFamily: $theme.typography.DisplayLarge.fontFamily,
                fontSize: "20px",
                fontWeight: 400,
              },
              textDecoration: "none",
              textTransform: "uppercase",
            })}
          >
            Submit A Business
          </StaticLink>
          <NavSocialLinks />
        </Row>
      </div>
    </div>
  );
};
