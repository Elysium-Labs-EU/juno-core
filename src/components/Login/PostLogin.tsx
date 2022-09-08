import { useEffect } from 'react'
import { push } from 'redux-first-history'
import { selectBaseLoaded, setIsAuthenticated } from '../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
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
      dispatch(push(RoutesConstants.TODO))
    }
  }, [baseLoaded])

  return <Baseloader />
}

export default PostLogin
