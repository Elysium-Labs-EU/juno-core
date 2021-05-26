import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { checkBase } from './Store/actions'
import './App.scss'
import ToDo from './components/ToDo/Todo'
import EmailDetail from './components/EmailDetail/EmailDetail'
import ComposeEmail from './components/Compose/ComposeEmail'
import Settings from './components/Settings'
import InformationOverview from './components/InformationOverview'
import FileOverview from './components/FileOverview'
import Inbox from './components/Inbox/Inbox'
import SpamEmail from './components/Spam/Spam'
import Header from './components/MainHeader/Header'
import DraftEmail from './components/Draft/DraftEmail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const mapStateToProps = (state) => {
  const { baseLoaded } = state
  return { baseLoaded }
}

const App = ({ baseLoaded, dispatch }) => {
  useEffect(() => {
    if (!baseLoaded) {
      dispatch(checkBase())
    }
  }, [baseLoaded])

  return (
    <Router>
      <div className="App">
        <div className="tlOuterContainer">
          <Header />
        </div>

        {/* Fix the bug with the path of the email id detail not being accurate */}
        <Switch>
          <Route path="/" exact={true} component={ToDo} />
          <Route path="/mail/:labelId/:threadId" component={EmailDetail} />
          <Route path="/compose" component={ComposeEmail} />
          <Route path="/drafts" component={DraftEmail} />
          <Route path="/spam" component={SpamEmail} />
          <Route path="/settings" component={Settings} />
          <Route path="/information-overview" component={InformationOverview} />
          <Route path="/file-overview" component={FileOverview} />
          <Route path="/inbox" component={Inbox} />
        </Switch>
      </div>
    </Router>
  )
}

export default connect(mapStateToProps)(App)
