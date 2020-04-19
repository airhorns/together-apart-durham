import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../lib/styletron";
import { Server, Sheet } from "styletron-engine-atomic";
import { TrackingScripts } from "../components/layout/TrackingScripts";

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
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `WebFont.load({google:{families:["DM Sans:regular,500,700","DM Serif Display:regular"]}});`,
            }}
          />
          <meta
            content="https://uploads-ssl.webflow.com/5e7a31dcdd44a76199b8112d/5e7e1bb3a3d3d67f4cef9bed_together-apart-og.png"
            property="og:image"
          />
          <meta content="summary" name="twitter:card" />
          <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="/images/webclip.png" rel="apple-touch-icon" />
          {TrackingScripts}
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
