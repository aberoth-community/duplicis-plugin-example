import { defineConfig } from 'vite'

// plugins
import duplicis from '@duplicis/config/vite'
import preact from '@preact/preset-vite'

// build config
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: './src/index.tsx',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['@duplicis/plugin-settings', 'preact/jsx-runtime'],
    },
  },
  plugins: [duplicis({ index: './src/index.tsx' }), preact()],
})
