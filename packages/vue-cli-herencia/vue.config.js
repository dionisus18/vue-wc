const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  // configure the workbox plugin
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-inheritance-loader")
      .loader("vue-inheritance-loader")
      .end()
      .use("vue-loader");
  },
});
