import EmailList from 'components/EmailList/EmailList'
import { useEffect } from 'react'
import { selectBaseLoaded } from 'store/baseSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setCurrentLabels } from 'store/labelsSlice'

const LABEL = ['SPAM']

const Spam = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(LABEL))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default Spam
