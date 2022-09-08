import EmailList from '../EmailList/EmailList'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import useSetCurrentLabel from '../../hooks/useSetCurrentLabel'

const HEADER_INBOX = 'Inbox'

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
