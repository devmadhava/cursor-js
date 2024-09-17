import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/main.js",
  output: [
    {
      file: "dist/esm.js",
      format: "esm",
      exports: "default",
    },
    {
      file: "dist/cjs.js",
      format: "cjs",
      exports: "default",
    },
    {
      file: "dist/min/cursor.js",
      format: "iife",
      name: "Cursor",
      exports: "default",
    },
  ],
  // plugins: [terser()],
  plugins: [terser({
    compress: {
      drop_console: true,
    },
    format: {
      comments: false,
    }
  })],
};
