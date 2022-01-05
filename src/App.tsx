import React, { useEffect } from 'react'
import { AnimatePresence } from "framer-motion"
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { checkBase, recheckBase, selectBaseLoaded } from './Store/baseSlice'
import './App.scss'
import './styles/ElementStyles.scss'
import './styles/typography.scss'
import BaseLoader from './components/BaseLoader/BaseLoader'
import Header from './components/MainHeader/Header'
import Routes from './constants/routes.json'
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
    <Router history={history}>
      {!baseLoaded && <BaseLoader />}
      {baseLoaded && (
        <GS.Base>
          <GS.OuterContainer>
            <Header />
          </GS.OuterContainer>

          <AnimatePresence exitBeforeEnter>
            <React.Suspense fallback={<CircularProgress />}>
              <Switch>
                <Route path={Routes.HOME} exact component={ToDo} />
                <Route path={Routes.EMAIL_DETAIL} component={EmailDetail} />
                <Route path={Routes.COMPOSE_EMAIL} component={ComposeEmail} />
                <Route path={Routes.DRAFTS} component={DraftEmail} />
                <Route path={Routes.SENT} component={SentEmail} />
                {/* <Route path={Routes.SPAM} component={SpamEmail} /> */}
                <Route path={Routes.SETTINGS} component={Settings} />
                <Route path={Routes.INBOX} component={Inbox} />
              </Switch>
            </React.Suspense>
          </AnimatePresence>
        </GS.Base>
      )}
    </Router>
  )
}

export default App
