import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const SENT_HEADER = 'Sent'

const Sent = () => {
  useSetCurrentLabel()

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
