import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { StyledSpinnerNext } from "baseui/spinner";
import { toaster } from "baseui/toast";
import { Layout } from "../components/layout/Layout";
import { Meta } from "../components/Meta";
import { StaticLink } from "../components/StaticLink";
import { Button } from "baseui/button";
import { ParagraphMedium } from "baseui/typography";
import { api } from "../lib/api";
import { Row } from "../components/Row";
import { Input } from "../components/form/Input";
import { Textarea } from "../components/form/Textarea";

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  return (
    <div className="w-form">
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
          email: Yup.string().email("Invalid email address").required("Required"),
          message: Yup.string().required("Required"),
        })}
        onSubmit={async (values, helpers) => {
          try {
            await api.post("/contact", values);
            toaster.positive("Contact form submitted! We'll be in touch ASAP!", {});
          } catch (e) {
            toaster.negative("There was an error submitting your form. Please try again.", { autoHideDuration: 3000 });
          }
          helpers.setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form>
            <h2>Contact Us</h2>
            <p>
              <strong>Note:</strong> If you&#x27;d like to submit a business for inclusion on Together Apart, that&#x27;s done{" "}
              <StaticLink href="/submit-a-business">over here</StaticLink>.
            </p>
            <Input label="Input" attribute="name" placeholder="Enter your name ..." />
            <Input label="Email" attribute="email" placeholder="hello@example.com" />
            <Textarea label="Message" attribute="message" />

            <Row>
              <Button type="submit" disabled={formik.isSubmitting} $style={{ marginRight: "1em" }}>
                {formik.isSubmitting ? "Submitting ..." : "Submit"}
              </Button>
              {formik.isSubmitting && <StyledSpinnerNext />}
            </Row>
          </Form>
        )}
      </Formik>
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
          <div>Thank you! We&#x27;ll try to get back to you within 24 hours.</div>
        </div>
      </div>
      <div className="error-message w-form-fail">
        <div>Oops! Something went wrong while submitting the form.</div>
      </div>
    </div>
  );
};

export default (_props: {}) => {
  return (
    <Layout>
      <Meta title="Contact Us" />
      <div className="narrow-container">
        <ParagraphMedium $style={{ textAlign: "center" }}>
          If you - as a patron or as a business owner - see a mistake, want to revise something for accuracy&apos;s sake, or anything else,
          please drop us a quick note below. We&apos;ll get back to you as soon as possible. You can email us at{" "}
          <a href="mailto:hi@together-apart.ca">hi@together-apart.ca</a>, or use the form below to get in touch.
        </ParagraphMedium>
        <ContactForm />
      </div>
    </Layout>
  );
};
