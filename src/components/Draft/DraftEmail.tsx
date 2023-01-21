import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import { HEADER_DRAFTS } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const DraftEmail = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={HEADER_DRAFTS} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default DraftEmail
