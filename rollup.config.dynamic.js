import { terser } from "rollup-plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import dynamicImportVariables from "@rollup/plugin-dynamic-import-vars";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./src/main_dyanmic.js",
  output: [
    {
      dir: "dist/dynamic",
      entryFileNames: "cursor.js",
      format: "esm",
      exports: "default",
    },
  ],
  plugins: [
    terser({
      compress: {
        drop_console: true,
      },
      format: {
        comments: false,
      }
    }), 
    nodeResolve(), 
    commonjs(), 
    dynamicImportVariables()
  ],
};

