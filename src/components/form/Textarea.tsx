import React from "react";
import { useFormikContext, Field, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Textarea as TextareaControl, TextareaProps } from "baseui/textarea";

export const Textarea = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & TextareaProps
) => {
  const { errors, touched } = useFormikContext<Values>();
  const error = touched[props.attribute] ? errors[props.attribute] : null;

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <Field name={props.attribute} as={TextareaControl} error={!!error} {...props}></Field>
    </FormControl>
  );
};
