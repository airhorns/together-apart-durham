import React from "react";
import { Heading, HeadingLevel } from "baseui/heading";
import { useStyletron } from "baseui";
import { Grid, Cell } from "baseui/layout-grid";
import { Button } from "baseui/button";
import { Block } from "baseui/block";

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
        marginBottom: $theme.sizing.scale1600,
        backgroundColor: "rgb(248	249	251)",
        color: $theme.colors.mono1000,
        borderRadius: $theme.borders.radius400,
        overflow: "hidden",
      })}
    >
      <HeadingLevel>
        <Grid gridMargins={0} gridGutters={0}>
          <Cell span={[4, 3, 5]}>
            <div
              className={css({
                height: "100%",
                minHeight: "12rem",
                backgroundImage: `url(${require("../assets/images/mothers-day-bouquet.jpeg")})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "0px 100%",
              })}
            />
          </Cell>
          <Cell span={[4, 5, 7]}>
            <Block padding="scale800" display="flex" flexDirection="column" justifyContent="center" height="100%">
              <div>
                <Heading $style={{ color: $theme.colors.mono1000 }}>Weekly Giveaway</Heading>
                <div className={css({ marginTop: $theme.sizing.scale600, marginBottom: $theme.sizing.scale600 })}>
                  Every Friday we will be giving away a $100 value gift package of items purchased from local Ottawa businesses. Nominate
                  someone who is working hard right now, someone you are grateful for, or someone who is making a difference. <br />
                  <br />
                  This is Community Supported Gratitude: by community, for community.
                </div>
                <Button
                  {...{ as: "a" }}
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
            </Block>
          </Cell>
        </Grid>
      </HeadingLevel>
    </div>
  );
};
