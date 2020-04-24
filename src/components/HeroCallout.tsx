import React from "react";
import { CurrentSite } from "../lib/sites";
import { Heading } from "baseui/heading";
import { useStyletron } from "baseui";

export const HeroCallout = (props: { heading: React.ReactNode; children: React.ReactNode }) => {
  const [css, $theme] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        paddingTop: $theme.sizing.scale800,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: $theme.sizing.scale1600,
        textAlign: "center",
      })}
    >
      <Heading $style={{ letterSpacing: ($theme.typography.font1050 as any).letterSpacing }}>{props.heading}</Heading>
      <div className={css({ marginTop: $theme.sizing.scale400 })}>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export const SupportLocalCallout = () => (
  <HeroCallout heading="Support local when you can.">
    Small businesses in the {CurrentSite.regionName} region are open and need your support to stay afloat during the pandemic.
  </HeroCallout>
);
