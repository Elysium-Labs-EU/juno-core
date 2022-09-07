import EmailList from '../EmailList/EmailList'
import * as local from '../../constants/draftConstants'
import AnimatedMountUnmount from '../../utils/animatedMountUnmount'
import Seo from '../Elements/Seo'
import useSetCurrentLabel from '../../hooks/useSetCurrentLabel'

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
