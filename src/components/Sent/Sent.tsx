import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../store/labelsSlice'
import { selectBaseLoaded } from '../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'

const LABEL = ['SENT']
const SENT_HEADER = 'Sent'

const Sent = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(LABEL))
    }
  }, [baseLoaded])

  return (
    <>
      <Seo title={SENT_HEADER} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Sent
