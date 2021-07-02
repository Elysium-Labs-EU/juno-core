import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { checkBase, selectBaseLoaded } from './Store/baseSlice'
import './App.scss'
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

const App = () => {
  const dispatch = useDispatch()
  const baseLoaded = useSelector(selectBaseLoaded)
  useEffect(() => {
    if (!baseLoaded) {
      dispatch(checkBase())
    }
  }, [baseLoaded])

  return (
    <Router>
      {!baseLoaded && <BaseLoader />}
      {baseLoaded && (
        <div className="App">
          <div className="tlOuterContainer">
            <Header />
          </div>

          {/* Fix the bug with the path of the email id detail not being accurate */}
          <Switch>
            <Route path="/" exact component={ToDo} />
            <Route path="/mail/:labelId/:threadId" component={EmailDetail} />
            <Route path="/compose/:messageId?" component={ComposeEmail} />
            <Route path="/drafts" component={DraftEmail} />
            <Route path="/sent" component={SentEmail} />
            <Route path="/spam" component={SpamEmail} />
            <Route path="/settings" component={Settings} />
            <Route
              path="/information-overview"
              component={InformationOverview}
            />
            <Route path="/file-overview" component={FileOverview} />
            <Route path="/inbox" component={Inbox} />
          </Switch>
        </div>
      )}
    </Router>
  )
}

export default App
