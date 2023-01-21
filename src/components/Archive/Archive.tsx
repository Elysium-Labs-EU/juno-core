import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import { HEADER_ARCHIVE } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const Archive = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={HEADER_ARCHIVE} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Archive
