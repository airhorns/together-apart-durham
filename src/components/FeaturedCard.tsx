import React from "react";
import { Heading, HeadingLevel } from "baseui/heading";
import { useStyletron } from "baseui";
import { Grid, Cell } from "baseui/layout-grid";
import { Button } from "baseui/button";
import Imgix from "react-imgix";
import { imgixURL } from "../lib/utils";

const textBoxShadow = "0px 0px 24px 0px rgba(255,255,255,0.8)";
const textBackground = "rgba(255,255,255,0.5)";

export const MothersDayContestCard = (_props: {}) => {
  const [css, $theme] = useStyletron();

  return (
    <HeadingLevel>
      <Grid gridMargins={0}>
        <Cell span={[4, 8, 12]}>
          <div
            className={css({
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(240	229	228)",
              backgroundImage: `url(${require("../assets/images/promos/gratitude-contest/watercolor.png")})`,
              color: $theme.colors.mono1000,
              borderRadius: $theme.borders.radius400,
              overflow: "hidden",
              marginBottom: $theme.sizing.scale600,
              flexDirection: "column",
              [$theme.mediaQuery.medium]: {
                flexDirection: "row",
                marginBottom: $theme.sizing.scale800,
              },
              padding: $theme.sizing.scale600,
            })}
          >
            <div
              className={css({
                flexGrow: 1,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              })}
            >
              <Heading $style={{ color: $theme.colors.mono1000, boxShadow: textBoxShadow, backgroundColor: textBackground }}>
                Weekly Giveaway
              </Heading>
              <p className={css({ boxShadow: textBoxShadow, backgroundColor: textBackground })}>
                Nominate someone you&apos;re grateful for to receive $100 in gifts sourced from local businesses.
              </p>
            </div>
            <div
              className={css({
                flexGrow: 1,
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                marginTop: $theme.sizing.scale400,
                [$theme.mediaQuery.medium]: { marginTop: "0px" },
              })}
            >
              <Button
                $as="a"
                target="_blank"
                href="https://forms.gle/C4zhnqVauHM1APkY8"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => {
                      return {
                        backgroundColor: $theme.colors.mono1000,
                        color: $theme.colors.white,
                      };
                    },
                  },
                }}
              >
                Submit a Nomination
              </Button>
            </div>
          </div>
        </Cell>
      </Grid>
    </HeadingLevel>
  );
};
