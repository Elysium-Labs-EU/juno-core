import { useEffect } from 'react'
import { push } from 'redux-first-history'

import Baseloader from 'components/BaseLoader/BaseLoader'
import RoutesConstants from 'constants/routesConstants'
import { setIsAuthenticated } from 'store/baseSlice'
import { useAppDispatch } from 'store/hooks'
import parseQueryString from 'utils/parseQueryString'

const GoogleCallBackTesting = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const { state }: { state?: string } = parseQueryString(
      window.location.search
    )
    if (state === 'success') {
      dispatch(setIsAuthenticated(true))
      dispatch(push(RoutesConstants.TODO))
    }
  }, [])

  return <Baseloader />
}

export default GoogleCallBackTesting
