import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { checkBase } from './Store/baseSlice'
import './App.scss'
import './styles/ElementStyles.scss'
import './styles/typography.scss'
import BaseLoader from './components/BaseLoader/BaseLoader'
import ToDo from './components/ToDo/Todo'
import EmailDetail from './components/EmailDetail/EmailDetail'
import ComposeEmail from './components/Compose/ComposeEmail'
import Settings from './components/Settings'
import InformationOverview from './components/InformationOverview'
import FileOverview from './components/FileOverview'
import Inbox from './components/Inbox/Inbox'
import SpamEmail from './components/Spam/Spam'
import SentEmail from './components/Sent/Sent'
import Header from './components/MainHeader/Header'
import DraftEmail from './components/Draft/DraftEmail'
import Routes from './constants/routes.json'
import * as GS from './styles/globalStyles'

const App = () => {
  const dispatch = useDispatch()
  const baseLoaded = useSelector((state) => state.base.baseLoaded)
  useEffect(() => {
    if (!baseLoaded) {
      dispatch(checkBase())
    }
  }, [baseLoaded])

  return (
    <Router>
      {!baseLoaded && <BaseLoader />}
      {baseLoaded && (
        <GS.App>
          <GS.OuterContainer>
            <Header />
          </GS.OuterContainer>

          <Switch>
            <Route path={Routes.HOME} exact component={ToDo} />
            <Route path={Routes.EMAIL_DETAIL} component={EmailDetail} />
            <Route path={Routes.COMPOSE_EMAIL} component={ComposeEmail} />
            <Route path={Routes.DRAFTS} component={DraftEmail} />
            <Route path={Routes.SENT} component={SentEmail} />
            <Route path={Routes.SPAM} component={SpamEmail} />
            <Route path={Routes.SETTINGS} component={Settings} />
            <Route
              path={Routes.INFORMATION_OVERVIEW}
              component={InformationOverview}
            />
            <Route path={Routes.FILE_OVERVIEW} component={FileOverview} />
            <Route path={Routes.INBOX} component={Inbox} />
          </Switch>
        </GS.App>
      )}
    </Router>
  )
}

export default App
