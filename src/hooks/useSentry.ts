import { useEffect } from 'react'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectIsSentryActive, setIsSentryActive } from '../store/utilsSlice'

export default function useSentry(sentryDSN: string | undefined) {
  const isSentryActive = useAppSelector(selectIsSentryActive)
  const dispatch = useAppDispatch()

  // Check for localStorage if the setting is configured. If it is, use it.
  useEffect(() => {
    const storedStatus = localStorage.getItem('isSentryActive')
    if (storedStatus !== null) {
      dispatch(setIsSentryActive(storedStatus === 'true'))
    }
  }, [])

  useEffect(() => {
    // Don't run Sentry when developing.
    if (sentryDSN && isSentryActive) {
      process.env.NODE_ENV !== 'development' &&
        Sentry.init({
          dsn: sentryDSN,
          integrations: [new Integrations.BrowserTracing()],

          // Set tracesSampleRate to 1.0 to capture 100%
          // of transactions for performance monitoring.
          // We recommend adjusting this value in production
          tracesSampleRate: 1.0,
        })
    }
  }, [sentryDSN, isSentryActive])
}
