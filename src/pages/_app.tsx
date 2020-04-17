import React from "react";
import App, { AppContext, AppProps } from "next/app";
import "../webflow/css/normalize.css";
import "../webflow/css/webflow.css";
import "../webflow/css/ottawa-covid-19-local-support.webflow.css";
import "../webflow/css/nice-select.css";
import "../components/global.css";

import { styletron, debug } from "../lib/styletron";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { ToasterContainer } from "baseui/toast";
import { theme } from "../lib/theme";
import sentry from "../lib/sentry";

const { captureException } = sentry();

interface TogetherApartAppState {
  hasError: boolean;
  errorEventId?: string;
}

interface TogetherApartAppProps {
  hasError: boolean;
  errorEventId?: string;
}

export default class TogetherApartApp extends App<TogetherApartAppProps, TogetherApartAppState> {
  state = {
    hasError: false,
    errorEventId: undefined,
  };

  // Wrap initial props getting in sentry error handling code
  static async getInitialProps({ Component, ctx }: AppContext) {
    try {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      const errorEventId = captureException(error, ctx);
      return {
        hasError: true,
        errorEventId,
      } as any;
    }
  }

  static getDerivedStateFromProps(props: AppProps & TogetherApartAppProps, state: TogetherApartAppState) {
    // If there was an error generated within getInitialProps, and we haven't yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
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
