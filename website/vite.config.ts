import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site: batchwork.github.io/Batchwork-for-Google-Workspace/
  base: process.env.GITHUB_PAGES === "true" ? "/Batchwork-for-Google-Workspace/" : "/",
});
