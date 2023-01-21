import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import { HEADER_INBOX } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const Inbox = () => {
  useSetCurrentLabel()

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
