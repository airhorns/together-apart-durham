import React from "react";
import { useFormikContext, Field, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Input as InputControl, InputProps } from "baseui/input";

export const Input = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & InputProps
) => {
  const { errors, touched } = useFormikContext<Values>();
  const error = touched[props.attribute] ? errors[props.attribute] : null;

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <Field name={props.attribute} as={InputControl} error={!!error} {...props}></Field>
    </FormControl>
  );
};
