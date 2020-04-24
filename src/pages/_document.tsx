import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../lib/styletron";
import { Server, Sheet } from "styletron-engine-atomic";
import { TrackingScripts } from "../components/layout/TrackingScripts";
import { Greeting } from "../components/Greeting";

interface ExtraProps {
  stylesheets: Sheet[];
}

export default class StyledDocument extends Document<ExtraProps> {
  static async getInitialProps(ctx: any) {
    const page = await ctx.renderPage((App: any) => (props: any) => {
      return (
        <StyletronProvider value={styletron}>
          <App {...props} />
        </StyletronProvider>
      );
    });

    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {[
            "https://fonts.googleapis.com",
            "https://connect.facebook.net",
            "https://www.google-analytics.com",
            "https://cdn.heapanalytics.com",
            "https://global-uploads.webflow.com",
          ].map((url) => (
            <link key={url} rel="preconnect" href={url} />
          ))}
          <noscript dangerouslySetInnerHTML={{ __html: `<!--\n${Greeting}-->` }} />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link href={"https://fonts.googleapis.com/css?family=DM+Sans:400,500,700|DM+Serif+Display&display=swap"} rel="stylesheet" />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
          <meta content="summary" name="twitter:card" />
          <meta content="/images/together-apart-og.png" property="og:image" />
          <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="/images/webclip.png" rel="apple-touch-icon" />
          {TrackingScripts}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
