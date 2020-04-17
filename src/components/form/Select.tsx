import React from "react";
import { useFormikContext, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Select as SelectControl, SelectProps } from "baseui/select";

export const Select = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & SelectProps
) => {
  const formik = useFormikContext<Values>();
  const error = formik.touched[props.attribute] ? formik.errors[props.attribute] : null;

  const onChange = React.useCallback(
    ({ value }) => {
      formik.setFieldTouched(props.attribute, true);
      formik.setFieldValue(props.attribute, value);
    },
    [formik, props.attribute]
  );

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <SelectControl id={props.attribute} error={!!error} {...props} value={formik.values[props.attribute]} onChange={onChange} />
    </FormControl>
  );
};
