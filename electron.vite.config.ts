import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, externalizeDepsPlugin, swcPlugin } from 'electron-vite'
import { ConfigEnv, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// 按需載入T-Desgin元件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

const CWD = process.cwd()

// see config at https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const { VITE_API_URL, VITE_API_URL_PREFIX } = loadEnv(mode, CWD)
  return {
    main: {
      resolve: {
        alias: {
          '@main': resolve('src/main')
        }
      },
      // build: {
      //   rollupOptions: {
      //     external: ['sqlite3']
      //   }
      // },
      plugins: [externalizeDepsPlugin(), swcPlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin()]
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer'),
          '@': resolve('src/renderer/src')
        }
      },
      build: {
        emptyOutDir: true, // 打包時先清空上一次構建生成的目錄
        reportCompressedSize: false, // 關閉檔案計算
        sourcemap: false, // 關閉生成map檔案 可以達到縮小打包體積
        rollupOptions: {
          output: {
            entryFileNames: `assets/entry/[name][hash].js`, // 引入檔名的名稱
            chunkFileNames: `assets/chunk/[name][hash].js`, // 包的入口檔名稱
            assetFileNames: `assets/file/[name][hash].[ext]` // 資原始檔像 字型，圖片等
            // manualChunks(id) {
            //   if (id.includes('monaco-editor'))
            //     return 'monaco-editor_' //程式碼分割為編輯器
            //   else if (id.includes('node_modules'))
            //     return 'vendor_' //程式碼分割為第三方包
            //   else if (id.includes('src/renderer/src/utils/drpy')) return 'worker_t3_' //程式碼分割為worker程序
            // }
          }
        }
      },
      css: {
        preprocessorOptions: {
          less: {
            modifyVars: {
              hack: `true; @import (reference) "${resolve('src/renderer/src/style/variables.less')}";`
            },
            math: 'strict',
            javascriptEnabled: true
          }
        }
      },
      plugins: [
        vue({
          template: {
            compilerOptions: {
              isCustomElement: (tag) => tag === 'webview' || tag === 'title-bar'
            }
          }
        }),
        vueJsx(),
        vueDevTools(),
        svgLoader(),
        AutoImport({
          resolvers: [
            TDesignResolver({
              library: 'vue-next'
            })
          ]
        }),
        Components({
          resolvers: [
            TDesignResolver({
              library: 'vue-next'
            })
          ]
        })
      ],
      server: {
        strictPort: true, // 埠衝突自動分配埠
        proxy: {
          [VITE_API_URL_PREFIX]: {
            target: VITE_API_URL, // 後臺介面域名
            changeOrigin: true //是否跨域
          }
        }
      }
    }
  }
})
