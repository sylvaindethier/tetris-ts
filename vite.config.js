import path, { resolve } from "path";
import { glob } from "glob";
import { defineConfig } from "vite";

// match all HTML files unless from "dist" & "node_modules"
const htmlFiles = glob.sync("**/*.html", {
  ignore: ["dist/**", "node_modules/**"],
});
const inputEntries = htmlFiles.map((file) => [
  // entry key: filename without extension
  file.slice(0, file.length - path.extname(file).length),

  // entry value: resolved file path
  resolve(__dirname, file),
]);

export default defineConfig({
  // resolve alias
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // "@src": resolve(__dirname, "src"),
      // "@app": resolve(__dirname, "app"),
    },
  },
  // needed for GitHub Pages
  base: "/tetris-ts/",
  build: {
    target: "esnext",
    rollupOptions: {
      input: Object.fromEntries(inputEntries),
    },
  },
});
