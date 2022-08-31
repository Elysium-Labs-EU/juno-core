import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../store/labelsSlice'
import { selectBaseLoaded } from '../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import { ALL_LABEL } from '../../constants/globalConstants'

const ALL_HEADER = 'All Mail'

const Sent = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels([ALL_LABEL]))
    }
  }, [baseLoaded])

  return (
    <>
      <Seo title={ALL_HEADER} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Sent
