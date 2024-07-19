import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { domReady } from './utils'

// console.log('preload loading...')

import { useLoading } from './loading'
const { appendLoading, removeLoading } = useLoading()

// @ts-ignore (define in dts)
domReady().then(() => {
  appendLoading()
  // console.log('dom ready')
})

// Custom APIs for renderer
const api = { removeLoading: removeLoading }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
