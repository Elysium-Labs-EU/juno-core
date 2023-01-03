import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { push } from 'redux-first-history'

import Baseloader from 'components/BaseLoader/BaseLoader'
import RoutesConstants from 'constants/routesConstants'
import { setIsAuthenticated } from 'store/baseSlice'
import { useAppDispatch } from 'store/hooks'
import parseQueryString from 'utils/parseQueryString'

const GoogleCallBackTesting = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // const { state }: { state?: string } = parseQueryString(
    //   window.location.search
    // )

    // if (state === 'success') {
    dispatch(setIsAuthenticated(true))
    // dispatch(push('/'))
    navigate('/')
    // }
  }, [])

  return <Baseloader />
}

export default GoogleCallBackTesting
