require("dotenv").config();
const webpack = require("webpack");
const withTM = require("next-transpile-modules")(["lodash-es", "react-blurhash"]);
const nextSourceMaps = require("@zeit/next-source-maps");

module.exports = nextSourceMaps(
  withTM({
    env: {
      SENTRY_DSN: process.env.SENTRY_DSN,
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
);
