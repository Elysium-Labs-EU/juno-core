import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import { HEADER_SENT } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const Sent = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={HEADER_SENT} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Sent
