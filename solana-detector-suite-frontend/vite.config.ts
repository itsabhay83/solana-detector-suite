import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { Buffer } from "buffer"; // Import Buffer polyfill

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: '/',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {}, // Ensures global is available
    Buffer: Buffer, // Makes Buffer globally available
  },
  optimizeDeps: {
    include: ['buffer'], // Ensure the 'buffer' package is included in optimized deps
  },
}));
