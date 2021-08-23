/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {
  checkBase,
  selectBaseLoaded,
  selectIsAuthenticated,
} from './Store/baseSlice'
import './App.scss'
import './styles/ElementStyles.scss'
import './styles/typography.scss'
import BaseLoader from './components/BaseLoader/BaseLoader'
import ToDo from './components/ToDo/Todo'
import EmailDetail from './components/EmailDetail/EmailDetail'
import ComposeEmail from './components/Compose/ComposeEmail'
import Settings from './components/Settings/Settings'
import Inbox from './components/Inbox/Inbox'
import SpamEmail from './components/Spam/Spam'
import SentEmail from './components/Sent/Sent'
import Header from './components/MainHeader/Header'
import DraftEmail from './components/Draft/DraftEmail'
import Routes from './constants/routes.json'
import * as GS from './styles/globalStyles'
import Login from './components/Login/Login'
import LoginSuccess from './components/Login/LoginSuccess'

// const Route = ({ component: Component, ...rest }) => {
//   const accessToken = localStorage.getItem('accessToken')
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         accessToken ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: Routes.HOME,
//             }}
//           />
//         )
//       }
//     />
//   )
// }

const App = () => {
  const dispatch = useDispatch()
  const baseLoaded = useSelector(selectBaseLoaded)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!baseLoaded && isAuthenticated) {
      dispatch(checkBase())
    }
  }, [baseLoaded, isAuthenticated])

  return (
    <Router>
      {!baseLoaded && !isAuthenticated && <Login />}
      {!baseLoaded && isAuthenticated && <BaseLoader />}
      {baseLoaded && isAuthenticated && (
        <GS.App>
          <GS.OuterContainer>
            <Header />
          </GS.OuterContainer>

          <Switch>
            <Route exact path="/login/success" component={LoginSuccess} />
            <Route exact path="/login/error">
              Error logging in. Please try again later.
            </Route>
            <Route
              path={Routes.HOME}
              exact
              component={isAuthenticated ? ToDo : Login}
            />
            <Route path={Routes.EMAIL_DETAIL} component={EmailDetail} />
            <Route path={Routes.COMPOSE_EMAIL} component={ComposeEmail} />
            <Route path={Routes.DRAFTS} component={DraftEmail} />
            <Route path={Routes.SENT} component={SentEmail} />
            <Route path={Routes.SPAM} component={SpamEmail} />
            <Route path={Routes.SETTINGS} component={Settings} />
            <Route path={Routes.INBOX} component={Inbox} />
          </Switch>
        </GS.App>
      )}
    </Router>
  )
}

export default App
