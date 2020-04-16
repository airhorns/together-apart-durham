import React from "react";
import { Layout } from "../components/layout/Layout";
import { Meta } from "../components/Meta";
import { StaticLink } from "../components/StaticLink";

export default (_props: {}) => (
  <Layout>
    <Meta title="Contact Us" />
    <div className="narrow-container">
      <div className="w-form">
        <form
          id="wf-form-Contact-Form"
          name="wf-form-Contact-Form"
          data-name="Contact Form"
        >
          <h2>Contact Us</h2>
          <p>
            <strong>Note:</strong> If you&#x27;d like to submit a business for
            inclusion on Together Apart, that&#x27;s done{" "}
            <StaticLink href="/submit-a-business">over here</StaticLink>.
          </p>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="input w-input"
            maxLength={256}
            name="name"
            data-name="Name"
            placeholder="Enter your name"
            id="name"
            required
          />
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            className="input w-input"
            maxLength={256}
            name="Email"
            data-name="Email"
            placeholder="youremail@yourdomain.com"
            id="Email"
            required
          />
          <label htmlFor="Website">Message</label>
          <div className="w-embed">
            <textarea
              className="w-input input"
              name="message"
              placeholder="Enter your message here..."
              required
            ></textarea>
          </div>
          <input
            type="submit"
            value="Submit"
            data-wait="Please wait..."
            data-w-id="022b6b15-2675-7934-f9f7-ba9c53ebfd1f"
            className="btn w-button"
          />
        </form>
        <div className="success w-form-done">
          <div className="success-wrapper">
            <div
              data-w-id="7d6eafb1-a27f-0300-96c1-ce5501eb7082"
              data-animation-type="lottie"
              data-src="https://uploads-ssl.webflow.com/5e7a31dcdd44a76199b8112d/5e7a31dd4dd994c4414fbd0d_lf30_editor_FcQPfq.json"
              data-loop="0"
              data-direction="1"
              data-autoplay="0"
              data-is-ix2-target="1"
              data-renderer="svg"
              data-default-duration="1.5015014403440954"
              data-duration="0"
              className="lottie-animation"
            ></div>
            <div>
              Thank you! We&#x27;ll try to get back to you within 24 hours.
            </div>
          </div>
        </div>
        <div className="error-message w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
    </div>
  </Layout>
);
