import { useEffect } from 'react'
import { push } from 'redux-first-history'

import Baseloader from 'components/BaseLoader/BaseLoader'
import RoutesConstants from 'constants/routes.json'
import { fetchToken } from 'data/api'
import { setIsAuthenticated } from 'store/baseSlice'
import { useAppDispatch } from 'store/hooks'
import parseQueryString from 'utils/parseQueryString'

const GoogleCallBackTesting = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { code, state }: { code?: string; state?: string } = parseQueryString(
      window.location.search
    )
    if (
      state === 'success' &&
      JSON.parse(fetchToken() ?? '')?.accessToken === code
    ) {
      // if (
      //     import.meta.env.VITE_USE_LOCAL_FRONTEND_CLOUD_BACKEND === 'true'
      //   ) {
      //     handleUserTokens(response).setCredentials()
      //   } else {
      //     handleUserTokens(response).setIdToken()
      //   }
      dispatch(setIsAuthenticated(true))
      dispatch(push(RoutesConstants.TODO))
    }
  }, [])

  return <Baseloader />
}

export default GoogleCallBackTesting
