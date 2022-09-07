import EmailList from '../EmailList/EmailList'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import useSetCurrentLabel from '../../hooks/useSetCurrentLabel'

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
