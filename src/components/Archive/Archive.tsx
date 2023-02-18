import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

const ARCHIVE_HEADER = 'Archive'

const Archive = () => {
  useSetCurrentLabel()

  return (
    <Layout activePage={ACTIVE_PAGE_HEADER.more} headerTitle={ARCHIVE_HEADER}>
      <EmailList />
    </Layout>
  )
}

export default Archive
