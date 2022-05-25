import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const path = require("path");

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.jsx"),
      name: "MyLib",
    },
  },
});
