import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_SENT } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

const Sent = () => {
  useSetCurrentLabel()

  return (
    <Layout activePage={ACTIVE_PAGE_HEADER.more} headerTitle={HEADER_SENT}>
      <EmailList />
    </Layout>
  )
}

export default Sent
