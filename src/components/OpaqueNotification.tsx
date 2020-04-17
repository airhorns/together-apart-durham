import React from "react";
import { useStyletron } from "baseui";
import { Display3, ParagraphMedium } from "baseui/typography";

// From https://jsfiddle.net/Hybrid8287/gtb1avet/1/
export const ItWorked = (_props: {}) => {
  return (
    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>
  );
};

export const OpaqueNotification = (props: { title: React.ReactNode; message: React.ReactNode; success?: boolean }) => {
  const [css, $theme] = useStyletron();

  return (
    <div
      className={css({
        width: "100%",
        height: "100%",
        padding: $theme.sizing.scale1000,
        backgroundColor: $theme.colors.primary,
        borderRadius: $theme.borders.radius200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animationDuration: ".3s",
        animationTimingFunction: $theme.animation.easeOutCurve,
        animationName: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        } as any,
      })}
    >
      <Display3 color="#13141b">{props.title}</Display3>
      {props.success && <ItWorked />}
      <ParagraphMedium color="#13141b">{props.message}</ParagraphMedium>
    </div>
  );
};

export const NotificationOverlay = (props: { children: React.ReactNode }) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      })}
    >
      {props.children}
    </div>
  );
};
