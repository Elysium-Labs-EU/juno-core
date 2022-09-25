import qs from 'qs'
import { useEffect } from 'react'
import { push } from 'redux-first-history'
import RoutesConstants from '../../../constants/routes.json'
import userApi from '../../../data/userApi'
import { setIsAuthenticated } from '../../../store/baseSlice'
import { useAppDispatch } from '../../../store/hooks'
import { setServiceUnavailable } from '../../../store/utilsSlice'
import handleUserTokens from '../../../utils/handleUserTokens'
import Baseloader from '../../BaseLoader/BaseLoader'

/**
 * @component GoogleCallBack
 * Parses the window location search parameters, and triggers the callback for Google. If succesful, the user is logged in, otherwise an error is thrown.
 * @returns {JSX.Element} a BaseLoader JSX.Element
 */

const GoogleCallBack = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getTokens = async () => {
      const { code, state }: { code?: string, state?: string } = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      })
      const body = {
        code,
        state
      }
      const response = await userApi().authGoogleCallback(body)
      // If the cloud backend is used with the local frontend, the authorization requires these additional values.
      if (response?.status === 200) {
        if (import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true') {
          handleUserTokens(response).setCredentials()
        } else {
          handleUserTokens(response).setIdToken()
        }
        dispatch(setIsAuthenticated(true))
        dispatch(push(RoutesConstants.TODO))
      } else {
        dispatch(setServiceUnavailable(response.error))
        dispatch(push(RoutesConstants.LOGIN))
      }
    }
    getTokens()
  }, [])

  return <Baseloader />
}

export default GoogleCallBack
