import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
import copy from "rollup-plugin-copy";

import packageJson from "./package.json";

export default {
  input: ["src/index.ts", "src/Thread/Thread.tsx"],
  output: [
    {
      dir: "build",
      format: "cjs",
      sourcemap: true,
    },
  ],
  preserveModules: true,
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sass({
      insert: true,
    }),
    // copy({
    //   targets: [
    //     {
    //       src: "src/variables.scss",
    //       dest: "build",
    //       rename: "variables.scss"
    //     },
    //     {
    //       src: "src/typography.scss",
    //       dest: "build",
    //       rename: "typography.scss"
    //     }
    //   ]
    // })
  ],
};
