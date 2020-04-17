import React from "react";
import { useFormikContext, Field, FormikValues } from "formik";
import { FormControl } from "baseui/form-control";
import { Textarea as TextareaControl, TextareaProps } from "baseui/textarea";

export const Textarea = <Values extends FormikValues>(props: { label: string; attribute: string } & TextareaProps) => {
  const { errors, touched } = useFormikContext<Values>();
  const error = touched[props.attribute] ? errors[props.attribute] : null;

  return (
    <FormControl label={props.label} error={error}>
      <Field name={props.attribute} as={TextareaControl} error={!!error} {...props}></Field>
    </FormControl>
  );
};
