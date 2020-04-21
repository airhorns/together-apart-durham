import React from "react";
import { StaticLink } from "../StaticLink";
import { CurrentSite } from "../../lib/sites";
import { useStyletron } from "baseui";

export const NavBar = (props: { coBrand?: React.ReactNode }) => {
  const [css, $theme] = useStyletron();

  return (
    <div className="nav-bar">
      <div className="container">
        <div className="nav-items">
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

          <div className="nav-link-wrapper">
            <StaticLink href="/submit-a-business" className="nav-link important-nav-link">
              Submit A Business
            </StaticLink>
            <div className="nav-social-links">
              <a href="https://instagram.com/togetherott" target="_blank" className="nav-social-link w-inline-block">
                <img src="/images/instagram.svg" width="30" alt="" className="image-3" />
              </a>
              <div className="div-block-4"></div>
              <a href="https://twitter.com/togetherott" target="_blank" className="nav-social-link w-inline-block">
                <img src="/images/twitter_white.svg" width="30" alt="" className="image-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
