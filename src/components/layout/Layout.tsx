import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { HeadingLevel } from "baseui/heading";

export const Layout = (props: { coBrand?: React.ReactNode; children: React.ReactNode }) => (
  <HeadingLevel>
    <NavBar coBrand={props.coBrand} />
    {props.children}
    <Footer />
  </HeadingLevel>
);
