import { useEffect, useMemo } from 'react'
import { push } from 'redux-first-history'
import { HistoryRouter } from 'redux-first-history/rr6'

import AppHeaderHelp from 'AppHeaderHelp'
import SendingBanner from 'components/SendingBanner/SendingBanner'
import SnackbarOrchestrator from 'components/SnackbarOrchestrator/SnackbarOrchestrator'
import { BASE_ARRAY } from 'constants/baseConstants'
import RoutesConstants from 'constants/routesConstants'
import { fetchToken } from 'data/api'
import RoutesComponent from 'Routes'
import {
  checkBase,
  recheckBase,
  selectBaseLoaded,
  selectIsAuthenticated,
  setIsAuthenticated,
} from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectStorageLabels } from 'store/labelsSlice'
import { history } from 'store/store'
import * as GS from 'styles/globalStyles'

const App = () => {
  const dispatch = useAppDispatch()
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!baseLoaded && isAuthenticated) {
      dispatch(checkBase())
    }
  }, [baseLoaded, isAuthenticated])

  useEffect(() => {
    const token = fetchToken()
    if (token) {
      dispatch(setIsAuthenticated(true))
      dispatch(push(RoutesConstants.TODO))
    }
  }, [])

  useEffect(() => {
    if (!baseLoaded && storageLabels.length === BASE_ARRAY.length) {
      dispatch(recheckBase())
    }
  }, [baseLoaded, storageLabels])

  const memoizedHeaderHelp = useMemo(() => <AppHeaderHelp />, [])

  const memoizedRoutesComponent = useMemo(() => <RoutesComponent />, [])

  return (
    <HistoryRouter history={history}>
      <GS.Base>
        <SendingBanner />
        {baseLoaded && memoizedHeaderHelp}
        {memoizedRoutesComponent}
        <SnackbarOrchestrator />
      </GS.Base>
    </HistoryRouter>
  )
}

export default App
