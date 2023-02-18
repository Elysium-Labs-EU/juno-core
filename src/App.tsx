import { useEffect, useMemo } from 'react'
import { push } from 'redux-first-history'
import { HistoryRouter } from 'redux-first-history/rr6'

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

const App = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const storageLabels = useAppSelector(selectStorageLabels)

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

  const memoizedRoutesComponent = useMemo(() => <RoutesComponent />, [])

  return (
    <HistoryRouter history={history}>{memoizedRoutesComponent}</HistoryRouter>
  )
}

export default App
