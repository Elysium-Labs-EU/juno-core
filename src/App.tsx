import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { selectActiveModal, selectInSearch, selectServiceUnavailable } from './store/utilsSlice'
import SnackbarNotification from './components/Elements/SnackbarNotification/SnackbarNotification'
import RoutesComponent from './Routes'
import HelpMenu from './components/Help/HelpMenu'
import useMultiKeyPress from './hooks/useMultiKeyPress'
import * as keyConstants from './constants/keyConstants'
import useKeyPress from './hooks/useKeyPress'

const actionKeys = [keyConstants.KEY_ARROW_RIGHT, keyConstants.KEY_SHIFT]

const App = () => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)
  const activeModal = useAppSelector(selectActiveModal)
  const [showHelpMenu, setShowHelpMenu] = useState(false)
  const escListenerHelpMenu = useKeyPress(keyConstants.KEY_ESCAPE)

  const closeHelpMenu = useCallback(() => {
    setShowHelpMenu(false)
  }, [])

  // Close help menu whenever a modal is opened.
  useEffect(() => {
    if (activeModal) {
      closeHelpMenu()
    }
  }, [activeModal])

  // Close help menu whenever a ESC is pressed and menu is opened.
  useEffect(() => {
    if (escListenerHelpMenu && showHelpMenu) {
      closeHelpMenu()
    }
  }, [escListenerHelpMenu, showHelpMenu])

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

  const memoizedRoutesComponent = useMemo(() => (
    <AnimatePresence exitBeforeEnter>
      <RoutesComponent />
    </AnimatePresence>
  ), [])

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
              <HelpMenu />
            )}
          </>
        )}
        {memoizedRoutesComponent}
        {serviceUnavailable && (
          <SnackbarNotification text={serviceUnavailable} />
        )}
      </GS.Base>
    </HistoryRouter>
  )
}

export default App
