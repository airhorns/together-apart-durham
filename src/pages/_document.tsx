import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "../lib/styletron";
import { Server, Sheet } from "styletron-engine-atomic";
import { TrackingScripts } from "../components/layout/TrackingScripts";
import { assert } from "../lib/utils";

const ReactComment = (props: { text: string }) => {
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    assert(ref.current).outerHTML = `<!-- ${props.text} -->`;
  }, [props.text]);
  return <div ref={ref as any} />;
};

class StyledDocument extends Document<{ stylesheets: Sheet[] }> {
  static async getInitialProps(props: any) {
    const page = props.renderPage((App: any) => (props: any) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <Html lang="en">
        <ReactComment
          text={`
__          ________ _      _        _    _ _____ _
 \ \        / /  ____| |    | |      | |  | |_   _| |
  \ \  /\  / /| |__  | |    | |      | |__| | | | | |
   \ \/  \/ / |  __| | |    | |      |  __  | | | | |
    \  /\  /  | |____| |____| |____  | |  | |_| |_|_|
     \/  \/   |______|______|______| |_|  |_|_____(_)
We're looking for people looking at code to help volunteer to make this site (and other stuff we're working on) better!
If you're interested, shoot harry@together-apart.ca an email. Let's help out where we can!
`}
        />
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
          <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="images/webclip.png" rel="apple-touch-icon" />
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

export default StyledDocument;
