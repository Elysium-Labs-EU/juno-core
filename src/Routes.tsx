import { Navigate, Route, Routes } from 'react-router-dom'

import Archive from 'components/Archive/Archive'
import BaseLoader from 'components/BaseLoader/BaseLoader'
import ComposeEmail from 'components/Compose/ComposeEmail'
import Draft from 'components/Draft/Draft'
import EmailDetail from 'components/EmailDetail/EmailDetail'
import Inbox from 'components/Inbox/Inbox'
import AuthExplanation from 'components/Login/AuthExplanation/AuthExplanation'
import GoogleCallback from 'components/Login/Callback/GoogleCallBack'
import Login from 'components/Login/Login'
import PageNotFound from 'components/PageNotFound/PageNotFound'
import SentEmail from 'components/Sent/Sent'
import Spam from 'components/Spam/Spam'
import ToDo from 'components/ToDo/Todo'
import Trash from 'components/Trash/Trash'
import RoutesConstants from 'constants/routesConstants'
import useSentry from 'hooks/useSentry'
import { selectBaseLoaded, selectIsAuthenticated } from 'store/baseSlice'
import { useAppSelector } from 'store/hooks'
import { selectIsFlexibleFlowActive } from 'store/utilsSlice'

const ProtectedRoute = ({
  baseLoaded,
  children,
  isAuthenticated,
}: {
  baseLoaded: boolean
  children: JSX.Element
  isAuthenticated: boolean
}) => {
  if (!isAuthenticated) {
    return <Navigate to={RoutesConstants.LOGIN} replace />
  }

  return baseLoaded ? children : <BaseLoader />
}

const ProtectedRouteTemplate = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const baseLoaded = useAppSelector(selectBaseLoaded)

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated} baseLoaded={baseLoaded}>
      {children}
    </ProtectedRoute>
  )
}

const RoutesComponent = () => {
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
  if (SENTRY_DSN) {
    useSentry(SENTRY_DSN)
  }

  return (
    <Routes>
      <Route path={RoutesConstants.LOGIN} element={<Login />} />
      <Route
        path={RoutesConstants.GOOGLE_AUTH_EXPLANATION}
        element={<AuthExplanation />}
      />
      <Route
        path={RoutesConstants.GOOGLE_CALLBACK}
        element={<GoogleCallback />}
      />
      <Route
        path={RoutesConstants.TODO}
        element={
          <ProtectedRouteTemplate>
            <ToDo />
          </ProtectedRouteTemplate>
        }
      />
      <Route
        path={RoutesConstants.EMAIL_DETAIL}
        element={
          <ProtectedRouteTemplate>
            <EmailDetail />
          </ProtectedRouteTemplate>
        }
      />
      <Route path={RoutesConstants.COMPOSE_EMAIL}>
        <Route
          path=""
          element={
            <ProtectedRouteTemplate>
              <ComposeEmail />
            </ProtectedRouteTemplate>
          }
        />
        <Route
          path=":draftId"
          element={
            <ProtectedRouteTemplate>
              <ComposeEmail />
            </ProtectedRouteTemplate>
          }
        />
      </Route>
      <Route
        path={RoutesConstants.DRAFT}
        element={
          <ProtectedRouteTemplate>
            <Draft />
          </ProtectedRouteTemplate>
        }
      />
      <Route
        path={RoutesConstants.SENT}
        element={
          <ProtectedRouteTemplate>
            <SentEmail />
          </ProtectedRouteTemplate>
        }
      />
      {isFlexibleFlowActive ? (
        <Route
          path={RoutesConstants.INBOX}
          element={
            <ProtectedRouteTemplate>
              <Inbox />
            </ProtectedRouteTemplate>
          }
        />
      ) : null}
      <Route
        path={RoutesConstants.ARCHIVE}
        element={
          <ProtectedRouteTemplate>
            <Archive />
          </ProtectedRouteTemplate>
        }
      />
      <Route
        path={RoutesConstants.SPAM}
        element={
          <ProtectedRouteTemplate>
            <Spam />
          </ProtectedRouteTemplate>
        }
      />
      <Route
        path={RoutesConstants.TRASH}
        element={
          <ProtectedRouteTemplate>
            <Trash />
          </ProtectedRouteTemplate>
        }
      />
      <Route path={RoutesConstants.WILDCARD} element={<PageNotFound />} />
    </Routes>
  )
}

export default RoutesComponent
