import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { push } from 'redux-first-history'
import { HistoryRouter } from 'redux-first-history/rr6'
import {
  checkBase,
  recheckBase,
  selectBaseLoaded,
  selectIsAuthenticated,
  setIsAuthenticated,
} from './store/baseSlice'
import Header from './components/MainHeader/Header'
import RoutesConstants from './constants/routes.json'
import * as GS from './styles/globalStyles'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { selectStorageLabels } from './store/labelsSlice'
import { BASE_ARRAY } from './constants/baseConstants'
import { history } from './store/store'
import { fetchToken } from './data/api'
import HelpButton from './components/Help/HelpButton'
import { selectInSearch, selectServiceUnavailable } from './store/utilsSlice'
import SnackbarNotification from './components/Elements/SnackbarNotification/SnackbarNotification'
import RoutesComponent from './Routes'
import HelpMenu from './components/Help/HelpMenu'
import useMultiKeyPress from './hooks/useMultiKeyPress'
import { setModifierKey } from './utils/setModifierKey'
import * as global from './constants/globalConstants'

const actionKeys = [setModifierKey, global.KEY_FORWARD_SLASH]

const App = () => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const [showHelpMenu, setShowHelpMenu] = useState(false)

  useEffect(() => {
    if (!baseLoaded && isAuthenticated) {
      dispatch(checkBase())
    }
  }, [baseLoaded, isAuthenticated])

  useEffect(() => {
    const token = fetchToken()
    if (token) {
      dispatch(setIsAuthenticated(true))
      dispatch(push(RoutesConstants.HOME))
    }
  }, [])

  useEffect(() => {
    if (!baseLoaded && storageLabels.length === BASE_ARRAY.length) {
      dispatch(recheckBase())
    }
  }, [baseLoaded, storageLabels])

  const handleEvent = useCallback(() => {
    setShowHelpMenu((prevState) => !prevState)
  }, [showHelpMenu])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <HistoryRouter history={history}>
      <GS.Base>
        {baseLoaded && (
          <>
            <GS.OuterContainer>
              <Header />
            </GS.OuterContainer>
            <HelpButton handleEvent={handleEvent} />
            {showHelpMenu && (
              <HelpMenu open={showHelpMenu} handleClose={handleEvent} />
            )}
          </>
        )}

        <AnimatePresence exitBeforeEnter>
          <RoutesComponent />
        </AnimatePresence>
        {serviceUnavailable && (
          <SnackbarNotification text={serviceUnavailable} />
        )}
      </GS.Base>
    </HistoryRouter>
  )
}

export default App
