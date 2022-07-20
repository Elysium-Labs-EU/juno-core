import qs from 'qs'
import { useEffect } from 'react'
import { push } from 'redux-first-history'
import * as RouteConstants from '../../../constants/routes.json'
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
      const { code }: { code?: string } = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      })
      const body = {
        code,
      }
      const response = await userApi().authGoogleCallback(body)
      if (response?.status === 200) {
        handleUserTokens(response).setAccessToken()
        dispatch(setIsAuthenticated(true))
        dispatch(push(RouteConstants.HOME))
      } else {
        dispatch(setServiceUnavailable(response.error))
      }
    }
    getTokens()
  }, [])

  return <Baseloader />
}

export default GoogleCallBack
