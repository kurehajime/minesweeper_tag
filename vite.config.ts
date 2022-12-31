import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/MineSweeper.ts"),
      name: "MineSweeper",
      fileName: (format) => `mine-sweeper.${format}.js`,
    },
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        // ダッシュを含むすべてのタグをカスタム要素として扱う
        isCustomElement: tag => tag === 'mine-sweeper'
      }
    }
  }),viteSingleFile()],
})
