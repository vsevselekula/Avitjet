import { build } from "esbuild";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.resolve(projectRoot, "dist");

await fs.mkdir(distDir, { recursive: true });

await build({
  entryPoints: [path.resolve(projectRoot, "src/main.ts")],
  outfile: path.resolve(distDir, "main.js"),
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: ["es2018"],
  logLevel: "info"
});

await build({
  entryPoints: [path.resolve(projectRoot, "src/ui.ts")],
  outfile: path.resolve(distDir, "ui.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2018"],
  logLevel: "info"
});

await fs.copyFile(path.resolve(projectRoot, "src/ui.html"), path.resolve(distDir, "ui.html"));
