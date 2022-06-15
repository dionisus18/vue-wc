const { defineConfig } = require("@vue/cli-service");
// Inside of webpack.config.js:

module.exports = defineConfig({
  transpileDependencies: true,
  // configure the workbox plugin
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: (tag) => tag.startsWith("wrapper-"),
        },
      }));
  },
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
