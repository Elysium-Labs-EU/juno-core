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
import assertNonNullish from './utils/assertNonNullish'

assertNonNullish(process.env.REACT_APP_BACKEND_URL, 'No Backend URL found')
assertNonNullish(process.env.REACT_APP_FRONTEND_URL, 'No Frontend URL found')

SuperTokens.init({
  languageTranslations: {
    translations: {
      // The property names define the language code of the translations
      en: {
        THIRD_PARTY_SIGN_IN_AND_UP_HEADER_TITLE: 'Login',
        THIRD_PARTY_PROVIDER_DEFAULT_BTN_START: 'Login with ',

        BRANDING_POWERED_BY_START: 'Juno ❤️ ',
        // If you added a custom label or placeholder you can also provide translation for them if necessary
        // You can also use these to provide translations for your component overrides
      },
    },
  },
  appInfo: {
    appName: 'Juno',
    apiDomain: process.env.REACT_APP_BACKEND_URL,
    websiteDomain: process.env.REACT_APP_FRONTEND_URL,
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    ThirdParty.init({
      // style: {
      //   container: {
      //     fontFamily: 'Raleway Variable',
      //     marginTop: '40vh',
      //     marginRight: 'auto',
      //     marginLeft: 'auto',
      //     padding: '40px 0',
      //   },
      //   headerTitle: {
      //     fontWeight: 200,
      //     userSelect: 'none',
      //     fontSize: '2.441rem',
      //   },
      //   divider: {
      //     display: 'none',
      //   },
      //   providerContainer: {
      //     paddingTop: '40px',
      //     paddingBottom: '40px',
      //   },
      //   providerButton: {
      //     backgroundColor: 'var(--color-black) !important',
      //     borderColor: 'var(--color-black) !important',
      //     boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px',
      //   },
      //   superTokensBranding: {
      //     borderRadius: '6px',
      //   },
      // },
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
