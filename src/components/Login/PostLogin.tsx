import { useEffect } from 'react'
import { push } from 'redux-first-history'

import Baseloader from 'components/BaseLoader/BaseLoader'
import RoutesConstants from 'constants/routesConstants'
import { selectBaseLoaded, setIsAuthenticated } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

const PostLogin = () => {
  const dispatch = useAppDispatch()
  const baseLoaded = useAppSelector(selectBaseLoaded)

  useEffect(() => {
    dispatch(setIsAuthenticated(true))
  }, [])

  useEffect(() => {
    if (baseLoaded) {
      dispatch(push(RoutesConstants.TODO))
    }
  }, [baseLoaded])

  return <Baseloader />
}

export default PostLogin
