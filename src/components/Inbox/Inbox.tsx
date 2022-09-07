import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../store/labelsSlice'
import { selectBaseLoaded } from '../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import { INBOX_LABEL } from '../../constants/globalConstants'

const HEADER_INBOX = 'Inbox'

const Inbox = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels([INBOX_LABEL]))
    }
  }, [baseLoaded])

  return (
    <>
      <Seo title={HEADER_INBOX} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Inbox
