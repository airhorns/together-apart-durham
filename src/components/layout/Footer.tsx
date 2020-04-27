import React from "react";
import { StaticLink } from "../StaticLink";
import { CurrentSite, Sites, CurrentSiteName } from "../../lib/sites";
import { useStyletron } from "baseui";
import { NavSocialLinks } from "./NavSocialLinks";

const Spacer = () => <> • </>;
const OtherSites = Object.entries(Sites).filter(([key]) => key != CurrentSiteName);

export const Footer = (_props: {}) => {
  const [css, $theme] = useStyletron();
  return (
    <div
      className={css({
        paddingTop: $theme.sizing.scale1600,
        paddingBottom: $theme.sizing.scale1600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <NavSocialLinks />
      <p className={css({ marginTop: $theme.sizing.scale800, textAlign: "center" })}>
        Because {CurrentSite.regionName} kicks ass.
        <br />
        This information is crowdsourced, so please excuse any inaccuracy and let us know if we can fix it!
        <br />
        <StaticLink href="/submit-a-change">Submit a change</StaticLink>
        <Spacer />
        <StaticLink href="/submit-a-business">Submit a business</StaticLink>
        <Spacer />
        <StaticLink href="/neighbourhoods">All Neighbourhoods</StaticLink>
        <br />
      </p>
      <img
        src="/images/outline-white.png"
        srcSet="/images/outline-white-p-500.png 500w, /images/outline-white-p-800.png 800w, /images/outline-white-p-1080.png 1080w, /images/outline-white-p-1600.png 1600w, /images/outline-white-p-2000.png 2000w, /images/outline-white-p-2600.png 2600w, /images/outline-white-p-3200.png 3200w, /images/outline-white.png 3816w"
        sizes="40px"
        alt="Outline of Ottawa"
        className={css({ width: "40px", marginTop: $theme.sizing.scale800, marginBottom: $theme.sizing.scale800 })}
      />
      <p>
        <StaticLink href="/contact">Contact Us</StaticLink>, we&apos;d love to hear what you think!{" "}
        <StaticLink href="/credits">Credits</StaticLink>
      </p>
      <p>
        {OtherSites.map(([key, site], index) => (
          <React.Fragment key={key}>
            <a href={site.rootURL}>Together Apart {site.regionName}</a>
            {index != OtherSites.length - 1 && <Spacer />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};
