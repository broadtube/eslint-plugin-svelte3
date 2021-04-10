import commonjs from "rollup-plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [
    { file: "index.js", format: "cjs" },
    { file: "index.es.js", format: "es" },
    { file: "index.umd.js", format: "umd", name: "processors" },
  ],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
    }),

    commonjs({
      include: "node_modules/**", // Default: undefined
      exclude: ["node_modules/foo/**", "node_modules/bar/**"], // Default: undefined
      extensions: [".js", ".coffee"], // Default: [ '.js' ]
      ignoreGlobal: false, // Default: false
      sourceMap: false, // Default: true
      namedExports: { react: ["createElement", "Component"] }, // Default: undefined
      ignore: ["conditional-runtime-dependency"],
    }),
    commonjs({ include: "node_modules/**" }),
  ],
};
