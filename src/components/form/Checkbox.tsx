import React from "react";
import { useFormikContext, FormikValues, useField } from "formik";
import { FormControl, FormControlProps } from "baseui/form-control";
import { Checkbox as CheckboxControl, CheckboxProps } from "baseui/checkbox";

export const GroupableCheckbox = <Values extends FormikValues>(
  props: { attribute: keyof Values & string; label: React.ReactNode } & CheckboxProps
) => {
  const [field, _meta, helpers] = useField(props.attribute);

  const onChange: CheckboxProps["onChange"] = React.useCallback(
    (event) => {
      helpers.setTouched(true);
      helpers.setValue(event.target.checked);
    },
    [helpers]
  );

  return (
    <CheckboxControl checked={!!field.value} onChange={onChange} {...props}>
      {props.label}
    </CheckboxControl>
  );
};

export const Checkbox = <Values extends FormikValues>(
  props: { label: FormControlProps["label"]; caption?: FormControlProps["caption"]; attribute: keyof Values & string } & CheckboxProps
) => {
  const [_field, meta] = useField(props.attribute);
  const error = (meta.touched && meta.error) || undefined;
  console.log(error);

  return (
    <FormControl label={props.label} caption={props.caption} error={error}>
      <GroupableCheckbox {...props} />
    </FormControl>
  );
};
