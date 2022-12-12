import { Navigate, Route, Routes } from 'react-router-dom'

import Archive from 'components/Archive/Archive'
import BaseLoader from 'components/BaseLoader/BaseLoader'
import ComposeEmail from 'components/Compose/ComposeEmail'
import DraftEmail from 'components/Draft/DraftEmail'
import EmailDetail from 'components/EmailDetail/EmailDetail'
import Inbox from 'components/Inbox/Inbox'
import GoogleCallback from 'components/Login/Callback/GoogleCallBack'
import Login from 'components/Login/Login'
import PageNotFound from 'components/PageNotFound/PageNotFound'
import SentEmail from 'components/Sent/Sent'
import ToDo from 'components/ToDo/Todo'
import RoutesConstants from 'constants/routes.json'
import useSentry from 'hooks/useSentry'
import { selectBaseLoaded, selectIsAuthenticated } from 'store/baseSlice'
import { useAppSelector } from 'store/hooks'
import { selectIsFlexibleFlowActive } from 'store/utilsSlice'

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
  useSentry(import.meta.env.VITE_SENTRY_DSN)

  return (
    <Routes>
      <Route path={RoutesConstants.LOGIN} element={<Login />} />
      <Route
        path={RoutesConstants.GOOGLE_CALLBACK}
        element={<GoogleCallback />}
      />
      <Route path={RoutesConstants.LOGIN_SUCCESS} element={<Login />} />
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
        path={RoutesConstants.DRAFTS}
        element={
          <ProtectedRouteTemplate>
            <DraftEmail />
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
      {isFlexibleFlowActive && (
        <Route
          path={RoutesConstants.INBOX}
          element={
            <ProtectedRouteTemplate>
              <Inbox />
            </ProtectedRouteTemplate>
          }
        />
      )}
      <Route
        path={RoutesConstants.ARCHIVE}
        element={
          <ProtectedRouteTemplate>
            <Archive />
          </ProtectedRouteTemplate>
        }
      />
      <Route path={RoutesConstants.WILDCARD} element={<PageNotFound />} />
    </Routes>
  )
}

export default RoutesComponent
