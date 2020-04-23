import React from "react";
import { CurrentSite } from "../lib/sites";
import { Heading } from "baseui/heading";
import { useStyletron } from "baseui";

export const HeroCallout = (props: { heading: React.ReactNode; children: React.ReactNode }) => {
  const [_css, $theme] = useStyletron();

  return (
    <div className="hero-section">
      <div className="container">
        <div className="hero-content">
          <Heading $style={{ letterSpacing: ($theme.typography.font1050 as any).letterSpacing }}>{props.heading}</Heading>
          <div className="paragraph-container">
            <div className="hero-paragraph">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupportLocalCallout = () => (
  <HeroCallout heading="Support local when you can.">
    Small businesses in the {CurrentSite.regionName} region are open and need your support to stay afloat during the pandemic.
  </HeroCallout>
);
