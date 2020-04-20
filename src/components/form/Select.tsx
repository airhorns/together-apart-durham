import React from "react";
import { useField, FormikValues } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Select as SelectControl, SelectProps } from "baseui/select";

export const Select = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & SelectProps
) => {
  const [field, meta, helpers] = useField(props.attribute);
  const error = (meta.touched && meta.error) || undefined;

  const onChange = React.useCallback(
    ({ value }) => {
      helpers.setTouched(true);
      helpers.setValue(value);
    },
    [helpers]
  );

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <SelectControl id={props.attribute} error={!!error} {...props} value={field.value} onChange={onChange} />
    </FormControl>
  );
};
