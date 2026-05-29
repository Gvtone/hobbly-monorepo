import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("emoji-picker-react")) return "vendor-emoji";
          if (id.includes("/motion/")) return "vendor-motion";
          if (id.includes("@radix-ui") || id.includes("lucide-react"))
            return "vendor-ui";
          if (id.includes("date-fns")) return "vendor-date";
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("react-router")
          )
            return "vendor-react";
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
