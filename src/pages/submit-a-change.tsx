import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { StyledSpinnerNext } from "baseui/spinner";
import { toaster } from "baseui/toast";
import { Layout } from "../components/layout/Layout";
import { Meta } from "../components/Meta";
import { Button } from "baseui/button";
import { api } from "../lib/api";
import { Row } from "../components/Row";
import { Input } from "../components/form/Input";
import { Textarea } from "../components/form/Textarea";
import { OpaqueNotification } from "../components/OpaqueNotification";
import { useStyletron } from "baseui";
import { GetStaticProps } from "next";
import { $backend } from "../lib/backend";
import { sortBy } from "lodash-es";
import { HeroCallout } from "../components/HeroCallout";
import { Heading, HeadingLevel } from "baseui/heading";
import { Select } from "../components/form/Select";
import { StaticLink } from "../components/StaticLink";
import { CurrentSite } from "../lib/sites";
import { NarrowContainer } from "../components/layout/NarrowContainer";

export interface SubmitChangeFormValues {
  businessID: string | null;
  submitterName: string;
  submitterEmail: string;
  request: string;
  siteID: string;
  siteName: string;
}

export const SubmitForm = (props: { businesses: Option[]; onSuccess: (values: SubmitChangeFormValues) => void }) => {
  const [css, $theme] = useStyletron();

  return (
    <div
      className={css({
        paddingLeft: $theme.sizing.scale400,
        paddingRight: $theme.sizing.scale400,
      })}
    >
      <Formik<SubmitChangeFormValues>
        initialValues={{
          businessID: null,
          submitterName: "",
          submitterEmail: "",
          request: "",
          siteID: CurrentSite.webflowID,
          siteName: CurrentSite.regionName,
        }}
        validationSchema={Yup.object({
          businessID: Yup.string().required("Required"),
          submitterName: Yup.string().required("Required"),
          submitterEmail: Yup.string().email("Invalid email address").required("Required"),
          request: Yup.string().required("Required"),
        })}
        onSubmit={async (values, helpers) => {
          try {
            await api.post("/submitChangeRequest", values);
            props.onSuccess(values);
          } catch (e) {
            toaster.negative("There was an error submitting your form. Please try again.", { autoHideDuration: 3000 });
          }
          helpers.setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form className={css({ position: "relative" })}>
            <HeadingLevel>
              <Heading>Submit a Change Request</Heading>
              <Select<SubmitChangeFormValues>
                id="businessID"
                label="Business"
                attribute="businessID"
                placeholder="Select a business ..."
                options={props.businesses}
              />
              <Input<SubmitChangeFormValues>
                id="email"
                label="Contact Email"
                attribute="submitterEmail"
                placeholder="hello@example.com"
                caption="In case we need to get touch to ask questions about this change we need your contact details. We won't share or sell your data."
              />
              <Input<SubmitChangeFormValues>
                id="submitterName"
                label="Contact Name"
                attribute="submitterName"
                placeholder="Enter your name"
              />

              <Textarea<SubmitChangeFormValues>
                id="request"
                label="What changes should to be made?"
                attribute="request"
                caption="Please outline any changes or corrections so we can keep this listing up to date."
              />

              <Row>
                <Button data-testid="submit-change-request" type="submit" disabled={formik.isSubmitting} $style={{ marginRight: "1em" }}>
                  {formik.isSubmitting ? "Submitting ..." : "Submit"}
                </Button>
                {formik.isSubmitting && <StyledSpinnerNext />}
              </Row>
            </HeadingLevel>
          </Form>
        )}
      </Formik>
    </div>
  );
};

interface Option {
  id: string;
  label: string;
}

interface SubmitProps {
  businesses: Option[];
}

export default (props: SubmitProps) => {
  const [success, setSuccess] = React.useState(false);
  const [css] = useStyletron();

  return (
    <Layout>
      <Meta title="Submit A Business" />
      <HeroCallout heading={`${CurrentSite.regionName} gives its support.`}>
        Please use this form to submit a request to change information about a listed business. We do our best to review and action every
        submission within 24 hours.
      </HeroCallout>
      <NarrowContainer>
        {!success && <SubmitForm businesses={props.businesses} onSuccess={() => setSuccess(true)} />}
        {success && (
          <OpaqueNotification
            title="Thanks!"
            message={
              <>
                Your change request has been received, we&apos;ll get back to you as soon as possible.
                <br />
                If you would like to add more details, or have any questions, feel free to email us at{" "}
                <a className={css({ color: "black" })} href="mailto:hi@together-apart.ca">
                  hi@together-apart.ca
                </a>{" "}
                or{" "}
                <StaticLink href="/contact" className={css({ color: "black" })}>
                  contact us here.
                </StaticLink>
              </>
            }
            success
          />
        )}
      </NarrowContainer>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<SubmitProps> = async (_ctx) => {
  await $backend.prepare();

  const businesses: Option[] = (await $backend.currentSiteItems()).map((item) => ({ id: item._id, label: item.name }));

  return {
    props: {
      businesses: sortBy(businesses, "label"),
    },
  };
};
