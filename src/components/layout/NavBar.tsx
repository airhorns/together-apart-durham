import React from "react";
import { StaticLink } from "../StaticLink";
import { CurrentSite } from "../../lib/sites";

export const NavBar = (_props: {}) => (
  <div className="nav-bar">
    <div className="container">
      <div className="nav-items">
        <StaticLink href="/" aria-current="page" className="brand-link w-inline-block w--current">
          <img src={CurrentSite.logoImageURL} width="159" alt="Logo" />
        </StaticLink>
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
