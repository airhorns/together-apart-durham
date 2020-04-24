import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { HeadingLevel } from "baseui/heading";
import { useStyletron } from "baseui";
import { Grid, Cell } from "baseui/layout-grid";

export const Layout = (props: { coBrand?: React.ReactNode; children: React.ReactNode }) => {
  const [css, $theme] = useStyletron();

  return (
    <HeadingLevel>
      <Grid>
        <Cell span={[4, 8, 12]}>
          <NavBar coBrand={props.coBrand} />
        </Cell>
        <Cell span={[4, 8, 12]}>{props.children}</Cell>
        <Cell span={[4, 8, 12]}>
          <Footer />
        </Cell>
      </Grid>
    </HeadingLevel>
  );
};
