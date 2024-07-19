import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import { removeLoading } from '../../preload/loading.ts'

// @ts-ignore (define in dts)
// createApp(App).mount('#app').$nextTick(window.removeLoading)
createApp(App).mount('#app')
// createApp(App)
//   .mount('#app')
//   .$nextTick(() => {
//     console.log('app mounted')
//     setTimeout(() => {
//       // @ts-ignore (define in dts)
//       window.removeLoading() // 確保這個方法在全域性作用域可訪問
//     }, 3000) // 延遲1000毫秒（1秒）後執行
//   })
