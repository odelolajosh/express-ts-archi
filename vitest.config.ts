import path from 'path'
import { loadEnv } from "vite"
import { defineProject } from "vitest/config"

export default defineProject({
  test: {
    environment: "node",
    root: "./",
    globals: true,
    isolate: false,
    env: loadEnv("test", process.cwd(), ""),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
})
