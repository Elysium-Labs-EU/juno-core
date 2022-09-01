import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Provider } from 'react-redux'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { Buffer } from 'buffer'
import App from './App'
import { GlobalStyle, theme } from './styles/globalStyles'
import { setupStore } from './store/store'

// Set a global variable for Buffer, this is used for decoding B64.
globalThis.Buffer = Buffer

// Don't run Sentry when developing.
process.env.NODE_ENV !== 'development' &&
  import.meta.env.VITE_SENTRY_DSN &&
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
