import React from "react";
import { useFormikContext, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Checkbox as CheckboxControl, CheckboxProps } from "baseui/checkbox";

export const GroupableCheckbox = <Values extends FormikValues>(
  props: { attribute: keyof Values & string; label: React.ReactNode } & CheckboxProps
) => {
  const formik = useFormikContext<Values>();
  const onChange: CheckboxProps["onChange"] = React.useCallback(
    (event) => {
      formik.setFieldTouched(props.attribute, true);
      formik.setFieldValue(props.attribute, event.target.checked);
    },
    [formik, props.attribute]
  );

  return (
    <CheckboxControl checked={!!formik.values[props.attribute]} onChange={onChange} {...props}>
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
