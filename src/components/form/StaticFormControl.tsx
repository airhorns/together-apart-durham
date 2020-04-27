import React from "react";
import { StyledLabel, StyledCaption, StyledControlContainer, FormControlProps } from "baseui/form-control";

export const StaticFormControl = (
  props: Pick<FormControlProps, "label" | "caption" | "disabled" | "error" | "positive"> & {
    children: React.ReactNode;
  }
) => {
  const sharedProps = {
    $disabled: !!props.disabled,
    $error: !!props.error,
    $positive: !!props.positive,
  };

  return (
    <React.Fragment>
      {props.label && (
        <StyledLabel data-baseweb="form-control-label" {...sharedProps}>
          {typeof props.label === "function" ? props.label(sharedProps) : props.label}
        </StyledLabel>
      )}
      <StyledControlContainer data-baseweb="form-control-container" {...sharedProps}>
        {props.children}
      </StyledControlContainer>
      {(props.caption || props.error || props.positive) && (
        <StyledCaption data-baseweb="form-control-caption" {...sharedProps}>
          {props.caption}
        </StyledCaption>
      )}
    </React.Fragment>
  );
};
