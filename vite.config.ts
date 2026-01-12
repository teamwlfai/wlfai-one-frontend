// https://vite.dev/config/
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["nonvarious-gaynelle-spurless.ngrok-free.dev"],
  },
});
// [#1d1d1d]
// [#333333]
// [#2c2c2c]
