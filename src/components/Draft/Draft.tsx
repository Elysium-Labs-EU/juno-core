import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_DRAFT } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

const Draft = () => {
  useSetCurrentLabel()

  return (
    <Layout activePage={ACTIVE_PAGE_HEADER.more} headerTitle={HEADER_DRAFT}>
      <EmailList />
    </Layout>
  )
}

export default Draft
