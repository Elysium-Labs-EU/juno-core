import {
  // lazy,
  useEffect,
  // Suspense
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { push } from 'redux-first-history'
import { HistoryRouter } from 'redux-first-history/rr6'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  checkBase,
  recheckBase,
  selectBaseLoaded,
  selectIsAuthenticated,
  setIsAuthenticated,
} from './Store/baseSlice'
import BaseLoader from './components/BaseLoader/BaseLoader'
import Header from './components/MainHeader/Header'
import RoutesConstants from './constants/routes.json'
// import LoadingState from './components/Elements/LoadingState/LoadingState'
import * as GS from './styles/globalStyles'
import { useAppDispatch, useAppSelector } from './Store/hooks'
import { selectStorageLabels } from './Store/labelsSlice'
import { BASE_ARRAY } from './constants/baseConstants'
import { history } from './Store/store'
import { fetchToken } from './data/api'
import EmailDetail from './components/EmailDetail/EmailDetail'
import HelpButton from './components/Help/HelpButton'
import { selectShowKeyboardCombos } from './Store/utilsSlice'
import ComposeEmail from './components/Compose/ComposeEmail'
import DraftEmail from './components/Draft/DraftEmail'
import ToDo from './components/ToDo/Todo'
import Inbox from './components/Inbox/Inbox'
import SentEmail from './components/Sent/Sent'
import Login from './components/Login/Login'
import GoogleCallback from './components/Login/Callback/GoogleCallBack'
import PageNotFound from './components/PageNotFound/PageNotFound'

// const ToDo = lazy(() => import('./components/ToDo/Todo'))
// const ComposeEmail = lazy(() => import('./components/Compose/ComposeEmail'))
// const Inbox = lazy(() => import('./components/Inbox/Inbox'))
// const SentEmail = lazy(() => import('./components/Sent/Sent'))
// const DraftEmail = lazy(() => import('./components/Draft/DraftEmail'))
// const PageNotFound = lazy(
//   () => import('./components/PageNotFound/PageNotFound')
// )
// const Login = lazy(() => import('./components/Login/Login'))
// const GoogleCallback = lazy(
//   () => import('./components/Login/Callback/GoogleCallBack')
// )

const ProtectedRoute = ({
  children,
  isAuthenticated,
  baseLoaded,
}: {
  children: JSX.Element
  isAuthenticated: boolean
  baseLoaded: boolean
}) => {
  if (!isAuthenticated) {
    return <Navigate to={RoutesConstants.LOGIN} replace />
  }

  return baseLoaded ? children : <BaseLoader />
}

const App = () => {
  const dispatch = useAppDispatch()
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const showKeyBoardCombos = useAppSelector(selectShowKeyboardCombos)

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

  return (
    <HistoryRouter history={history}>
      <GS.Base>
        {baseLoaded && (
          <>
            <GS.OuterContainer>
              <Header />
            </GS.OuterContainer>
            {!showKeyBoardCombos && <HelpButton />}
          </>
        )}

        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route path={RoutesConstants.LOGIN} element={<Login />} />
            <Route
              path={RoutesConstants.GOOGLE_CALLBACK}
              element={<GoogleCallback />}
            />
            <Route path={RoutesConstants.LOGIN_SUCCESS} element={<Login />} />
            <Route
              path={RoutesConstants.HOME}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  baseLoaded={baseLoaded}
                >
                  <ToDo />
                </ProtectedRoute>
              }
            />
            <Route
              path={RoutesConstants.EMAIL_DETAIL}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  baseLoaded={baseLoaded}
                >
                  <EmailDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path={RoutesConstants.COMPOSE_EMAIL}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  baseLoaded={baseLoaded}
                >
                  <ComposeEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path={RoutesConstants.DRAFTS}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  baseLoaded={baseLoaded}
                >
                  <DraftEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path={RoutesConstants.SENT}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  baseLoaded={baseLoaded}
                >
                  <SentEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path={RoutesConstants.INBOX}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  baseLoaded={baseLoaded}
                >
                  <Inbox />
                </ProtectedRoute>
              }
            />
            <Route path={RoutesConstants.WILDCARD} element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </GS.Base>
    </HistoryRouter>
  )
}

export default App
