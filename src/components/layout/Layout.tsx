import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout = (props: { coBrand?: React.ReactNode; children: React.ReactNode }) => (
  <>
    <NavBar coBrand={props.coBrand} />
    {props.children}
    <Footer />
  </>
);
