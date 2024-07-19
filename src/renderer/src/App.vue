<script setup lang="ts">
import { onMounted } from 'vue'
import Versions from './components/Versions.vue'

// @ts-ignore (define in dts)
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
onMounted(() => {
  setTimeout(() => {
    console.log('on mounted', window)
    // @ts-ignore (define in dts)
    window.api.removeLoading()
  }, 3000)
})
</script>

<template>
  <img alt="logo" class="logo" src="../../../resources/icon.png" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions />
</template>
