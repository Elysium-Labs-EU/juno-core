import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import { HEADER_TRASH } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const Trash = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={HEADER_TRASH} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default Trash
