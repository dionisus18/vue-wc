const { defineConfig } = require("@vue/cli-service");
// Inside of webpack.config.js:

module.exports = defineConfig({
  transpileDependencies: true,
  // configure the workbox plugin
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./sw.js",
      // ...other Workbox options...
      swDest: "./sw.js",
      maximumFileSizeToCacheInBytes: 4097152,
    },
  },
});
