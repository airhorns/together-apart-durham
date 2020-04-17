import React from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Layout = (props: { children: React.ReactNode }) => (
  <>
    <NavBar />
    {props.children}
    <Footer />
  </>
);
