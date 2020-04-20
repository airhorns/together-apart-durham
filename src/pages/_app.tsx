import React from "react";
import Router from "next/router";
import App from "next/app";
import NProgress from "nprogress";
import "../webflow/css/normalize.css";
import "../webflow/css/webflow.css";
import "../webflow/css/ottawa-covid-19-local-support.webflow.css";
import "../components/nprogress.css";
import "../components/global.css";

import { styletron, debug } from "../lib/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { ToasterContainer } from "baseui/toast";
import { theme } from "../lib/theme";
import sentry from "../lib/sentry";
import { Greeting } from "../components/Greeting";

const { captureException } = sentry();

const getPathFromUrl = (url: string) => {
  return url.split("?")[0];
};

Router.events.on("routeChangeStart", (url) => {
  console.log("url", { new: getPathFromUrl(url), old: window.location.pathname });
  if (getPathFromUrl(url) != window.location.pathname) {
    console.log(`Loading: ${url}`);
    NProgress.start();
  }
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

if (typeof window != "undefined") {
  console.log(`%c${Greeting}`, `color: #B10DC9`);
}

interface TogetherApartAppState {
  hasError: boolean;
  errorEventId?: string;
}

export default class TogetherApartApp extends App<{}, TogetherApartAppState> {
  state = {
    hasError: false,
    errorEventId: undefined,
  };

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and later render a fallback UI).
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within `getDerivedStateFromError`.
    this.setState({ errorEventId });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <BaseProvider theme={theme}>
          <ToasterContainer>{this.state.hasError ? <div>There was an error.</div> : <Component {...pageProps} />}</ToasterContainer>
        </BaseProvider>
      </StyletronProvider>
    );
  }
}
