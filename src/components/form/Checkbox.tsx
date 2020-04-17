import React from "react";
import { useFormikContext, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Checkbox as CheckboxControl, CheckboxProps } from "baseui/checkbox";

export const GroupableCheckbox = <Values extends FormikValues>(
  props: { attribute: keyof Values & string; label: React.ReactNode } & CheckboxProps
) => {
  const formik = useFormikContext<Values>();

  return (
    <CheckboxControl value={formik.values[props.attribute]} {...props}>
      {props.label}
    </CheckboxControl>
  );
};

export const Checkbox = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & CheckboxProps
) => {
  const { errors, touched } = useFormikContext<Values>();
  const error = touched[props.attribute] ? errors[props.attribute] : null;

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <GroupableCheckbox {...props} />
    </FormControl>
  );
};
