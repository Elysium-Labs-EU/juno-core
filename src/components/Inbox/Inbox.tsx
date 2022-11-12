import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

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
