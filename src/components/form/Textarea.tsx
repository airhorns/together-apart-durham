import React from "react";
import { useField, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Textarea as TextareaControl, TextareaProps } from "baseui/textarea";

export const Textarea = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & TextareaProps
) => {
  const [field, meta] = useField(props.attribute);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <TextareaControl name={props.attribute} error={!!error} {...field} {...props} />
    </FormControl>
  );
};
