import EmailList from '../EmailList/EmailList'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import useSetCurrentLabel from '../../hooks/useSetCurrentLabel'

const ARCHIVE_HEADER = 'Archive'

const Archive = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={ARCHIVE_HEADER} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Archive
