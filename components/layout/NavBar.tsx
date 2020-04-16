import React from "react";
import { StaticLink } from "../StaticLink";

export const NavBar = (_props: {}) => (
  <div className="nav-bar">
    <div className="container">
      <div className="nav-items">
        <StaticLink
          href="/"
          aria-current="page"
          className="brand-link w-inline-block w--current"
        >
          <img
            src="/images/together-apart-white-logo.png"
            width="159"
            srcSet="/images/together-apart-white-logo-p-500.png 500w, /images/together-apart-white-logo-p-800.png 800w, /images/together-apart-white-logo-p-1080.png 1080w, /images/together-apart-white-logo.png 1308w"
            sizes="158.99147033691406px"
            alt=""
          />
        </StaticLink>
        <div className="nav-link-wrapper">
          <StaticLink
            href="/submit-a-business"
            className="nav-link important-nav-link"
          >
            Submit A Business
          </StaticLink>
          <div className="nav-social-links">
            <a
              href="https://instagram.com/togetherott"
              target="_blank"
              className="nav-social-link w-inline-block"
            >
              <img
                src="/images/instagram.svg"
                width="30"
                alt=""
                className="image-3"
              />
            </a>
            <div className="div-block-4"></div>
            <a
              href="https://twitter.com/togetherott"
              target="_blank"
              className="nav-social-link w-inline-block"
            >
              <img
                src="/images/twitter_white.svg"
                width="30"
                alt=""
                className="image-3"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
