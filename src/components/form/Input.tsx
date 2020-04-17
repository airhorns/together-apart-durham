import React from "react";
import { useFormikContext, Field, FormikValues } from "formik";
import { FormControl } from "baseui/form-control";
import { Input as InputControl, InputProps } from "baseui/input";

export const Input = <Values extends FormikValues>(props: { label: string; attribute: string } & InputProps) => {
  const { errors, touched } = useFormikContext<Values>();
  const error = touched[props.attribute] ? errors[props.attribute] : null;

  return (
    <FormControl label={props.label} error={error}>
      <Field name={props.attribute} as={InputControl} error={!!error} {...props}></Field>
    </FormControl>
  );
};
