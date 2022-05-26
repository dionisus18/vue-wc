const { defineConfig } = require("@vue/cli-service");
// Inside of webpack.config.js:
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new InjectManifest({
        maximumFileSizeToCacheInBytes: 4097152,
        swDest: "./sw.js",
        swSrc: "./src/sw.js",
      }),
    ],
  },
});
