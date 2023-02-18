import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

const SENT_HEADER = 'Sent'

const Sent = () => {
  useSetCurrentLabel()

  return (
    <Layout activePage={ACTIVE_PAGE_HEADER.more} headerTitle={SENT_HEADER}>
      <EmailList />
    </Layout>
  )
}

export default Sent
