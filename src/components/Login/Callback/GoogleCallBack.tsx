import qs from 'qs'
import { useEffect } from 'react'
import { push } from 'redux-first-history'
import * as RouteConstants from '../../../constants/routes.json'
import userApi from '../../../data/userApi'
import { setIsAuthenticated } from '../../../Store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import {
  selectServiceUnavailable,
  setServiceUnavailable,
} from '../../../Store/utilsSlice'
import handleUserTokens from '../../../utils/handleUserTokens'

const GoogleCallBack = () => {
  const dispatch = useAppDispatch()
  const serviceUnavailable = useAppSelector(selectServiceUnavailable)

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
        handleUserTokens(response).setBothTokens()
        dispatch(setIsAuthenticated(true))
        dispatch(push(RouteConstants.HOME))
      } else {
        dispatch(setServiceUnavailable(response.error))
      }
    }
    getTokens()
  }, [])

  return (
    <div>
      {!serviceUnavailable ? <p>Loading</p> : <p>{serviceUnavailable}</p>}
    </div>
  )
}

export default GoogleCallBack
