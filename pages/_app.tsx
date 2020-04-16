import React from "react";
import App from "next/app";
import "../webflow/css/normalize.css";
import "../webflow/css/webflow.css";
import "../webflow/css/ottawa-covid-19-local-support.webflow.css";
import "../webflow/css/nice-select.css";
import "../components/global.css";

import { styletron, debug } from "../lib/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { theme } from "../lib/theme";

export default class TogetherApartApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={theme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    );
  }
}
