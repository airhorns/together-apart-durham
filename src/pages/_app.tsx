import React from "react";
import Router from "next/router";
import App from "next/app";
import NProgress from "nprogress";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron, debug } from "../lib/styletron";
import { BaseProvider } from "baseui";
import { ToasterContainer } from "baseui/toast";
import { theme } from "../lib/theme";
import sentry from "../lib/sentry";
import { Greeting } from "../components/Greeting";

import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/nprogress.css";
import "../assets/stylesheets/global.css";

const { Sentry, captureException } = sentry();

const getPathFromUrl = (url: string) => {
  return url.split("?")[0];
};

Router.events.on("routeChangeStart", (url) => {
  if (getPathFromUrl(url) != window.location.pathname) {
    NProgress.start();
  }

  Sentry.addBreadcrumb({
    category: "route",
    message: `routeChangeStart: ${url}`,
  });
});

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", (err, url) => {
  NProgress.done();
  Sentry.addBreadcrumb({
    category: "route",
    message: `routeChangeError: ${url}`,
    data: err,
  });
});

if (typeof window != "undefined" && process.env.NODE_ENV == "production") {
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
          <ToasterContainer />
          {this.state.hasError ? <div>There was an error.</div> : <Component {...pageProps} />}
        </BaseProvider>
      </StyletronProvider>
    );
  }
}
