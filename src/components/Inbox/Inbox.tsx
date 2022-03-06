import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../Store/labelsSlice'
import { selectBaseLoaded } from '../../Store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'

export const INBOX_LABEL = ['INBOX']

const Inbox = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(INBOX_LABEL))
    }
  }, [baseLoaded])

  return (
    <AnimatedMountUnmount>
      <EmailList />
    </AnimatedMountUnmount>
  )
}

export default Inbox
