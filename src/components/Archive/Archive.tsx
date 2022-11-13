import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

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
