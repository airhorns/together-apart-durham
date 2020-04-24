import React from "react";
import { Layout } from "../components/layout/Layout";
import { HeroCallout } from "../components/HeroCallout";
import { Meta } from "../components/Meta";

export default (_props: {}) => {
  return (
    <Layout>
      <Meta title="Credits" />
      <HeroCallout heading="Support local businesses when you can.">
        <p className="hero-paragraph">
          This site is a not-for-profit community initiative by Ottawa for Ottawa. Let&#x27;s help keep our amazing local businesses afloat
          as best we can.
          <br />
          <br />
          <a href="https://twitter.com/hashemito">Mo</a>, <a href="https://twitter.com/harrybrundage/">Harry</a>,{" "}
          <a href="https://twitter.com/gleegz">Glennys</a>, <a href="https://twitter.com/shannonkarleen?lang=en">Shannon</a>, Kelsey,{" "}
          <a href="http://twitter.com/travisn">Travis</a>, <a href="https://twitter.com/stevestp">Steve</a>,{" "}
          <a href="https://twitter.com/madsewins">Maddy</a>, and Isabel produced this site with help from the community every step of the
          way.
          <br />
          <br />
          Site originally by{" "}
          <a href="https://twitter.com/nickbrownokc" target="_blank" className="footer-link">
            Nick
          </a>
          ,{" "}
          <a href="https://twitter.com/katieengo" target="_blank" className="footer-link">
            Katie
          </a>
          ,{" "}
          <a href="https://twitter.com/mattvaru" target="_blank" className="footer-link">
            Matt
          </a>
          ,{" "}
          <a href="http://twitter.com/jakespirek" className="footer-link">
            Jake
          </a>{" "}
          &amp;{" "}
          <a href="https://twitter.com/rileyrichter" target="_blank" className="footer-link">
            Ben
          </a>{" "}
          for Oklahoma. Because it kicks ass too.
          <br />‍<br />
          Want to set this thing up for your own city? Clone it on Webflow:{" "}
          <a href="https://webflow.com/website/COVID-19-Support-Website" className="footer-link">
            https://webflow.com/website/COVID-19-Support-Website
          </a>
          <br />
        </p>
      </HeroCallout>
    </Layout>
  );
};
