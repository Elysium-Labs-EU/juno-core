import Seo from 'components/Elements/Seo'
import EmailList from 'components/EmailList/EmailList'
import * as local from 'constants/draftConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import AnimatedMountUnmount from 'utils/animatedMountUnmount'

const DraftEmail = () => {
  useSetCurrentLabel()

  return (
    <>
      <Seo title={local.DRAFT_HEADER} />
      <AnimatedMountUnmount>
        <EmailList />
      </AnimatedMountUnmount>
    </>
  )
}

export default DraftEmail
