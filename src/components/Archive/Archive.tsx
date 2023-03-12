import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_ARCHIVE } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

const Archive = () => {
  useSetCurrentLabel()

  return (
    <Layout activePage={ACTIVE_PAGE_HEADER.more} headerTitle={HEADER_ARCHIVE}>
      <EmailList />
    </Layout>
  )
}

export default Archive
