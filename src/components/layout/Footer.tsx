import React from "react";
import { StaticLink } from "../StaticLink";
import { CurrentSite } from "../../lib/sites";

const Spacer = () => <> • </>;

export const Footer = (_props: {}) => (
  <div className="footer">
    <div className="container">
      <div className="footer-wrapper">
        <div className="nav-social-links footer-social-links">
          <a href="https://instagram.com/togetherott" target="_blank" className="nav-social-link w-inline-block">
            <img src="/images/instagram.svg" width="30" alt="" className="image-3" />
          </a>
          <div className="div-block-4"></div>
          <a href="https://twitter.com/togetherott" target="_blank" className="nav-social-link w-inline-block">
            <img src="/images/twitter_white.svg" width="30" alt="" className="image-3" />
          </a>
        </div>
        <p className="footer-paragraph">
          Because {CurrentSite.regionName} kicks ass. <StaticLink href="/contact">Contact Us</StaticLink> if you see a mistake, want more
          information, or to start this for your own community!
          <br />
          This information is crowdsourced, so please excuse any inaccuracy and let us know so we can fix it!
          <br />
          <StaticLink href="/neighbourhood" className="footer-link">
            All Neighbourhoods
          </StaticLink>
          <Spacer />
          <StaticLink href="/credits" className="footer-link">
            Credits
          </StaticLink>
          <Spacer />
          <StaticLink href="/submit-a-business">Submit a business</StaticLink> 
        </p>
        <img
          src="/images/outline-white.png"
          srcSet="/images/outline-white-p-500.png 500w, /images/outline-white-p-800.png 800w, /images/outline-white-p-1080.png 1080w, /images/outline-white-p-1600.png 1600w, /images/outline-white-p-2000.png 2000w, /images/outline-white-p-2600.png 2600w, /images/outline-white-p-3200.png 3200w, /images/outline-white.png 3816w"
          sizes="40px"
          alt=""
          className="footer-image"
        />
      </div>
    </div>
  </div>
);
