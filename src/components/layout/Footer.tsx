import React from "react";
import { StaticLink } from "../StaticLink";
import { CurrentSite } from "../../lib/sites";
import { useStyletron } from "baseui";

const Spacer = () => <> • </>;

export const Footer = (_props: {}) => {
  const [css, $theme] = useStyletron();
  return (
    <div className={css({ paddingTop: $theme.sizing.scale1600, paddingBottom: $theme.sizing.scale1600 })}>
      <div className="footer-wrapper">
        <div className="nav-social-links footer-social-links">
          <a href="https://instagram.com/togetherott" target="_blank" rel="noopener" className="nav-social-link w-inline-block">
            <img src="/images/instagram.svg" width="30" alt="" className="image-3" />
          </a>
          <div className="div-block-4"></div>
          <a href="https://twitter.com/togetherott" target="_blank" rel="noopener" className="nav-social-link w-inline-block">
            <img src="/images/twitter_white.svg" width="30" alt="" className="image-3" />
          </a>
        </div>
        <p className="footer-paragraph">
          Because {CurrentSite.regionName} kicks ass.
          <br />
          This information is crowdsourced, so please excuse any inaccuracy and let us know if we can fix it!
          <br />
          <StaticLink href="/submit-a-change">Submit a change</StaticLink>
          <Spacer />
          <StaticLink href="/submit-a-business">Submit a business</StaticLink>
          <Spacer />
          <StaticLink href="/neighbourhoods" className="footer-link">
            All Neighbourhoods
          </StaticLink>
          <br />
        </p>
        <img
          src="/images/outline-white.png"
          srcSet="/images/outline-white-p-500.png 500w, /images/outline-white-p-800.png 800w, /images/outline-white-p-1080.png 1080w, /images/outline-white-p-1600.png 1600w, /images/outline-white-p-2000.png 2000w, /images/outline-white-p-2600.png 2600w, /images/outline-white-p-3200.png 3200w, /images/outline-white.png 3816w"
          sizes="40px"
          alt=""
          className="footer-image"
        />
        <p>
          <StaticLink href="/contact">Contact Us</StaticLink>, we&apos;d love to hear what you think!
          <Spacer />
          <StaticLink href="/credits" className="footer-link">
            Credits
          </StaticLink>
        </p>
      </div>
    </div>
  );
};
