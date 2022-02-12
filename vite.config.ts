import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";
import pkg from "./package.json";

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [
    solidPlugin(),
    WindiCSS({
      scan: {
        fileExtensions: ["html", "ts", "jsx", "tsx"],
      },
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
