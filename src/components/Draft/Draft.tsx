import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import * as local from 'constants/draftConstants'
import { ACTIVE_PAGE_HEADER } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

const Draft = () => {
  useSetCurrentLabel()

  return (
    <Layout
      activePage={ACTIVE_PAGE_HEADER.more}
      headerTitle={local.DRAFT_HEADER}
    >
      <EmailList />
    </Layout>
  )
}

export default Draft
