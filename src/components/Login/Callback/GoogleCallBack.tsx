import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { push } from 'redux-first-history'

import Baseloader from 'components/BaseLoader/BaseLoader'
import { SOMETHING_WRONG } from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import userApi from 'data/userApi'
import { setIsAuthenticated } from 'store/baseSlice'
import { useAppDispatch } from 'store/hooks'
import handleUserTokens from 'utils/handleUserTokens'
import parseQueryString from 'utils/parseQueryString'

/**
 * @component GoogleCallBack
 * Parses the window location search parameters, and triggers the callback for Google. If succesful, the user is logged in, otherwise an error is thrown.
 * @returns {JSX.Element} a BaseLoader JSX.Element
 */

const GoogleCallBack = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getTokens = async () => {
      const { code, state }: { code?: string; state?: string } =
        parseQueryString(window.location.search)
      try {
        const body = {
          code,
          state,
        }

        const response = await userApi().authGoogleCallback(body)

        // If the cloud backend is used with the local frontend, the authorization requires the complete Credentials object.
        if (
          typeof response === 'object' &&
          'status' in response &&
          response?.status === 200 &&
          'data' in response
        ) {
          if (
            import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true'
          ) {
            handleUserTokens(response).setCredentials()
          } else {
            handleUserTokens(response).setIdToken()
          }
          dispatch(setIsAuthenticated(true))
          dispatch(push(RoutesConstants.TODO))
        } else {
          const message =
            typeof response === 'object' && 'error' in response
              ? response?.error ?? SOMETHING_WRONG
              : response

          toast.error(message)
          dispatch(push(RoutesConstants.LOGIN))
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)

        toast.error(SOMETHING_WRONG)
      }
    }
    getTokens()
  }, [])

  return <Baseloader />
}

export default GoogleCallBack
