require("dotenv").config();
const webpack = require("webpack");
const withImages = require("next-images");
const withTM = require("next-transpile-modules")(["lodash-es", "react-blurhash"]);
const nextSourceMaps = require("@zeit/next-source-maps")({ devtool: "cheap-module-source-map" });
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
if (!process.env.CURRENT_SITE) process.env.CURRENT_SITE = "ottawa";

module.exports = withBundleAnalyzer(
  withImages(
    nextSourceMaps(
      withTM({
        env: {
          SENTRY_DSN: process.env.SENTRY_DSN,
          ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
          CURRENT_SITE: process.env.CURRENT_SITE,
        },
        webpack: (config, { isServer, buildId }) => {
          config.plugins.push(
            new webpack.DefinePlugin({
              "process.env.SENTRY_RELEASE": JSON.stringify(buildId),
            })
          );

          if (!isServer) {
            config.resolve.alias["@sentry/node"] = "@sentry/browser";
          }

          config.externals = config.externals || {};
          config.externals["styletron-server"] = "styletron-server";

          return config;
        },
      })
    )
  )
);

console.log(`Building for CURRENT_SITE = ${process.env.CURRENT_SITE}.`);
