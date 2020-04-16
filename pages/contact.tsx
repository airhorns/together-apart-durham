import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Layout } from "../components/layout/Layout";
import { Meta } from "../components/Meta";
import { StaticLink } from "../components/StaticLink";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";
import { ParagraphMedium } from "baseui/typography";

export const ContactForm = (_props: {}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255, "Must be 255 characters or less").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        helpers.setSubmitting(false);
      }, 1000);
    },
  });

  return (
    <div className="w-form">
      <form onSubmit={formik.handleSubmit}>
        <h2>Contact Us</h2>
        <p>
          <strong>Note:</strong> If you&#x27;d like to submit a business for inclusion on Together Apart, that&#x27;s done{" "}
          <StaticLink href="/submit-a-business">over here</StaticLink>.
        </p>
        <FormControl label="Name" error={formik.errors.name}>
          <Input id="name" {...formik.getFieldProps("name")} placeholder="Enter your name ..." error={!!formik.errors.name} />
        </FormControl>

        <FormControl label="Email" error={formik.errors.email}>
          <Input id="email" {...formik.getFieldProps("email")} placeholder="hello@example.com" error={!!formik.errors.email} />
        </FormControl>

        <FormControl label="Message" error={formik.errors.message}>
          <Textarea id="message" {...formik.getFieldProps("message")} error={!!formik.errors.message} />
        </FormControl>

        <Button type="submit" disabled={formik.isSubmitting} onClick={() => formik.handleSubmit()}>
          {formik.isSubmitting ? "Submitting ..." : "Submit"}
        </Button>
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
  const [css] = useStyletron();

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
