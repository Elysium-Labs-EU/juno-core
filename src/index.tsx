import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { Provider } from 'react-redux'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Session from 'supertokens-auth-react/recipe/session'
import SuperTokens from 'supertokens-auth-react'
import ThirdParty, { Google } from 'supertokens-auth-react/recipe/thirdparty'
import { store } from './Store/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GlobalStyle, theme } from './styles/globalStyles'
import RoutesConstants from './constants/routes.json'

SuperTokens.init({
  appInfo: {
    appName: 'Juno',
    apiDomain: 'http://localhost:5001',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    ThirdParty.init({
      getRedirectionURL: async (context) => {
        if (context.action === 'SUCCESS') {
          if (context.redirectToPath !== undefined) {
            // we are navigating back to where the user was before they authenticated
            return RoutesConstants.LOGIN_SUCCESS
          }
          return RoutesConstants.LOGIN_SUCCESS
        }
        return undefined
      },
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    Session.init(),
  ],
})

// Don't run Sentry when developing.
process.env.NODE_ENV !== 'development' &&
  process.env.REACT_APP_SENTRY_DSN &&
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
