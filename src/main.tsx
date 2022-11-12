import App from 'App'
import { Buffer } from 'buffer'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { GlobalStyle } from 'styles/globalStyles'

// Set a global variable for Buffer, this is used for decoding B64.
globalThis.Buffer = Buffer

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
