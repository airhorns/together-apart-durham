import React from "react";

export const HeroCallout = (props: { heading: React.ReactNode; children: React.ReactNode }) => (
  <div className="hero-section">
    <div className="container">
      <div className="hero-content">
        <h1 className="hero-heading">{props.heading}</h1>
        <div className="paragraph-container">
          <p className="hero-paragraph">{props.children}</p>
        </div>
      </div>
    </div>
  </div>
);

export const SupportLocalCallout = () => (
  <HeroCallout heading="Support local when you can.">
    Small businesses in Ottawa are open and need your support to stay afloat during the pandemic.
  </HeroCallout>
);
