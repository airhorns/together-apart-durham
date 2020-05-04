import React from "react";
import { Heading, HeadingLevel } from "baseui/heading";
import { useStyletron } from "baseui";
import { Grid, Cell } from "baseui/layout-grid";
import { Button } from "baseui/button";

export const MothersDayContestCard = (_props: {}) => {
  const [css, $theme] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: $theme.sizing.scale800,
        backgroundColor: "rgb(240	229	228)",
        color: $theme.colors.mono1000,
        borderRadius: $theme.borders.radius400,
        overflow: "hidden",
      })}
    >
      <HeadingLevel>
        <Grid gridMargins={0} gridGutters={0}>
          <Cell span={[4, 5, 7]}>
            <div
              className={css({
                paddingTop: $theme.sizing.scale800,
                paddingLeft: $theme.sizing.scale800,
                paddingRight: $theme.sizing.scale800,
                paddingBottom: "0px",
                marginBottom: "-5%",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                [$theme.mediaQuery.medium]: {
                  marginBottom: "auto",
                  paddingBottom: $theme.sizing.scale800,
                },
              })}
            >
              <div>
                <Heading $style={{ color: $theme.colors.mono1000 }}>Weekly Giveaway</Heading>
                <div className={css({ marginTop: $theme.sizing.scale600, marginBottom: $theme.sizing.scale600 })}>
                  Every Friday we will be giving away a $100 value gift package of items purchased from local Ottawa businesses. Nominate
                  someone who is working hard right now, someone you are grateful for, or someone who is making a difference. <br />
                  <br />
                  This is Community Supported Gratitude: by community, for community.
                </div>
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
          <Cell span={[4, 3, 5]}>
            <div
              className={css({
                height: "100%",
                minHeight: "12rem",
                backgroundImage: `url(${require("../assets/images/promos/gratitude-contest/vertical.png")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "50% 0%",
                [$theme.mediaQuery.medium]: {
                  backgroundImage: `url(${require("../assets/images/promos/gratitude-contest/horizontal.png")})`,
                  backgroundPosition: "0% 50%",
                  marginRight: "-2px",
                },
              })}
            />
          </Cell>
        </Grid>
      </HeadingLevel>
    </div>
  );
};
