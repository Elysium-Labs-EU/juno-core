import { Buffer } from 'buffer'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
// import * as Sentry from '@sentry/react'
// import { Integrations } from '@sentry/tracing'

import App from './App'
import { store } from './store/store'
import { GlobalStyle, theme } from './styles/globalStyles'

// Set a global variable for Buffer, this is used for decoding B64.
globalThis.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
)
