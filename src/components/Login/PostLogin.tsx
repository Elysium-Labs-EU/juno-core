import { useEffect } from 'react'
import { push } from 'redux-first-history'
import { selectBaseLoaded, setIsAuthenticated } from '../../Store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import Baseloader from '../BaseLoader/BaseLoader'
import RoutesConstants from '../../constants/routes.json'

const PostLogin = () => {
  const dispatch = useAppDispatch()
  const baseLoaded = useAppSelector(selectBaseLoaded)

  useEffect(() => {
    dispatch(setIsAuthenticated(true))
  }, [])

  useEffect(() => {
    if (baseLoaded) {
      dispatch(push(RoutesConstants.HOME))
    }
  }, [baseLoaded])

  return <Baseloader />
}

export default PostLogin
