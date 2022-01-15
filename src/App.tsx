import React, { useEffect, Suspense } from 'react'
import { AnimatePresence } from "framer-motion"
import { HistoryRouter } from "redux-first-history/rr6"
import {
  Routes,
  Route,
} from 'react-router-dom'
import { checkBase, recheckBase, selectBaseLoaded } from './Store/baseSlice'
import BaseLoader from './components/BaseLoader/BaseLoader'
import Header from './components/MainHeader/Header'
import RoutesConstants from './constants/routes.json'
import LoadingState from './components/Elements/LoadingState'
import * as GS from './styles/globalStyles'
import { useAppDispatch, useAppSelector } from './Store/hooks'
import { selectStorageLabels } from './Store/labelsSlice'
import { BASE_ARRAY } from './constants/baseConstants'
import { history } from "./Store/store"

const ToDo = React.lazy(() => import('./components/ToDo/Todo'))
const EmailDetail = React.lazy(() => import('./components/EmailDetail/EmailDetail'))
const ComposeEmail = React.lazy(() => import('./components/Compose/ComposeEmailContainer'))
const Settings = React.lazy(() => import('./components/Settings'))
const Inbox = React.lazy(() => import('./components/Inbox/Inbox'))
// const SpamEmail = React.lazy(() => import('./components/Spam/Spam'))
const SentEmail = React.lazy(() => import('./components/Sent/Sent'))
const DraftEmail = React.lazy(() => import('./components/Draft/DraftEmail'))

const App = () => {
  const dispatch = useAppDispatch()
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const storageLabels = useAppSelector(selectStorageLabels)

  useEffect(() => {
    if (!baseLoaded) {
      dispatch(checkBase())
    }
  }, [baseLoaded])

  useEffect(() => {
    if (!baseLoaded && storageLabels.length === BASE_ARRAY.length) {
      dispatch(recheckBase())
    }
  }, [baseLoaded, storageLabels])

  return (
    <HistoryRouter history={history}>
      {!baseLoaded && <BaseLoader />}
      {baseLoaded && (
        <GS.Base>
          <GS.OuterContainer>
            <Header />
          </GS.OuterContainer>

          <AnimatePresence exitBeforeEnter>
            <Routes>
              <Route path={RoutesConstants.HOME} element={<Suspense fallback={<LoadingState />}><ToDo /></Suspense>} />
              <Route path={RoutesConstants.EMAIL_DETAIL} element={<Suspense fallback={<LoadingState />}><EmailDetail /></Suspense>} />
              <Route path={RoutesConstants.COMPOSE_EMAIL} element={<Suspense fallback={<LoadingState />}><ComposeEmail /></Suspense>} />
              <Route path={RoutesConstants.DRAFTS} element={<Suspense fallback={<LoadingState />}><DraftEmail /></Suspense>} />
              <Route path={RoutesConstants.SENT} element={<Suspense fallback={<LoadingState />}><SentEmail /></Suspense>} />
              {/* <Route path={RoutesConstants.SPAM} element={<Suspense fallback={<LoadingState />}><SpamEmail /></Suspense>} /> */}
              <Route path={RoutesConstants.SETTINGS} element={<Suspense fallback={<LoadingState />}><Settings /></Suspense>} />
              <Route path={RoutesConstants.INBOX} element={<Suspense fallback={<LoadingState />}><Inbox /></Suspense>} />
            </Routes>
          </AnimatePresence>
        </GS.Base>
      )}
    </HistoryRouter>
  )
}

export default App
