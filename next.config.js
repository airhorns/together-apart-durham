const webpack = require("webpack");
const withTM = require("next-transpile-modules")(["lodash-es"]);
const nextSourceMaps = require("@zeit/next-source-maps");

module.exports = nextSourceMaps(
  withTM({
    env: {
      SENTRY_DSN: process.env.SENTRY_DSN,
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

      return config;
    },
  })
);
