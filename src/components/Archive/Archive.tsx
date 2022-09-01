import { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../store/labelsSlice'
import { selectBaseLoaded } from '../../store/baseSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import { ARCHIVE_LABEL } from '../../constants/globalConstants'

const ARCHIVE_HEADER = 'Archive'

const Sent = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels([ARCHIVE_LABEL]))
    }
  }, [baseLoaded])

  return (
    <>
      <Seo title={ARCHIVE_HEADER} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Sent
