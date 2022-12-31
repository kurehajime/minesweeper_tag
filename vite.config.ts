import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        // ダッシュを含むすべてのタグをカスタム要素として扱う
        isCustomElement: tag => tag === 'mine-sweeper'
      }
    }
  })],
})
