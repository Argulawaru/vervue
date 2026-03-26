const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add resolve.fallback for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback, // Keep existing fallbacks if any
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "fs": false // 'fs' is not available in browsers, so tell Webpack to ignore it
      };

      // Optional: If you need to make sure 'process' is defined, though often handled by Babel/Webpack automatically
      // webpackConfig.plugins.push(
      //   new webpack.ProvidePlugin({
      //     process: 'process/browser', // You might need to install 'process' if you enable this
      //   })
      // );

      return webpackConfig;
    },
  },
};