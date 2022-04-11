import { lazy, useEffect, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { push } from 'redux-first-history'
import { HistoryRouter } from 'redux-first-history/rr6'
import { Routes, Route } from 'react-router-dom'
import * as reactRouterDom from 'react-router-dom'
import { getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react'
import { ThirdPartyAuth } from 'supertokens-auth-react/recipe/thirdparty'
import {
  checkBase,
  recheckBase,
  selectBaseLoaded,
  selectIsAuthenticated,
  setIsAuthenticated,
} from './Store/baseSlice'
import Header from './components/MainHeader/Header'
import RoutesConstants from './constants/routes.json'
import LoadingState from './components/Elements/LoadingState/LoadingState'
import * as GS from './styles/globalStyles'
import { useAppDispatch, useAppSelector } from './Store/hooks'
import { selectStorageLabels } from './Store/labelsSlice'
import { BASE_ARRAY } from './constants/baseConstants'
import { history } from './Store/store'
import { fetchToken } from './data/api'
import EmailDetail from './components/EmailDetail/EmailDetail'
import HelpButton from './components/Help/HelpButton'
import { selectShowKeyboardCombos } from './Store/utilsSlice'
import PostLogin from './components/Login/PostLogin'
import ComposeEmail from './components/Compose/ComposeEmail'
import DraftEmail from './components/Draft/DraftEmail'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Inbox from './components/Inbox/Inbox'
import SentEmail from './components/Sent/Sent'
import ToDo from './components/ToDo/Todo'

// const ToDo = lazy(() => import('./components/ToDo/Todo'))
// const ComposeEmail = lazy(() => import('./components/Compose/ComposeEmail'))
// const Inbox = lazy(() => import('./components/Inbox/Inbox'))
// const SentEmail = lazy(() => import('./components/Sent/Sent'))
// const DraftEmail = lazy(() => import('./components/Draft/DraftEmail'))
// const PageNotFound = lazy(
//   () => import('./components/PageNotFound/PageNotFound')
// )
// const PostLogin = lazy(() => import('./components/Login/PostLogin'))

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
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
            <Route
              path={RoutesConstants.LOGIN_SUCCESS}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <PostLogin />
                </ThirdPartyAuth>
                // </Suspense>
              }
            />
            <Route
              path={RoutesConstants.HOME}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <ToDo />
                </ThirdPartyAuth>
                // </Suspense>
              }
            />
            <Route
              path={RoutesConstants.EMAIL_DETAIL}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <EmailDetail />
                </ThirdPartyAuth>
                // </Suspense>
              }
            />
            <Route
              path={RoutesConstants.COMPOSE_EMAIL}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <ComposeEmail />
                </ThirdPartyAuth>
                // </Suspense>
              }
            />
            <Route
              path={RoutesConstants.DRAFTS}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <DraftEmail />
                </ThirdPartyAuth>
                // </Suspense>
              }
            />
            <Route
              path={RoutesConstants.SENT}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <SentEmail />
                </ThirdPartyAuth>
                // </Suspense>
              }
            />
            <Route
              path={RoutesConstants.INBOX}
              element={
                // <Suspense fallback={<LoadingState />}>
                <ThirdPartyAuth>
                  <Inbox />
                </ThirdPartyAuth>
                // </Suspense>
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
