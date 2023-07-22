/* eslint-disable no-new */
/* eslint-disable no-underscore-dangle */
import { Buffer } from 'buffer'

import { WebviewWindow } from '@tauri-apps/api/window'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'

import App from 'App'
import { store } from 'store/store'
import { GlobalStyle } from 'styles/globalStyles'

// declare global {
//   interface Window {
//     __TAURI_METADATA__?: any
//   }
// }

// Set a global variable for Buffer, this is used for decoding B64.
globalThis.Buffer = Buffer

// Set a global variable to check if we're in a Tauri window.
new WebviewWindow(window.__TAURI_METADATA__?.__currentWindow.label)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <GlobalStyle />
        <App />
      </Provider>
    </HelmetProvider>
  </StrictMode>
)
