import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path"; // ✅ Import path module
import tailwindcss from "@tailwindcss/vite"; // ✅ This import is incorrect (see below)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()], // ❌ Remove tailwindcss() from plugins, it's not a valid Vite plugin
});
