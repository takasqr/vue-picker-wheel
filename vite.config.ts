// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // https://ja.vitejs.dev/guide/build.html#%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%89
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: resolve(__dirname, 'src/lib.js'),
      name: 'VuePickerWheel',
      // 適切な拡張子が追加されます
      fileName: 'vue-picker-wheel'
    },
    rollupOptions: {
      // ライブラリにバンドルされるべきではない依存関係を
      // 外部化するようにします
      external: ['vue'],
      output: {
        // 外部化された依存関係のために UMD のビルドで使用する
        // グローバル変数を提供します
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({ 
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
