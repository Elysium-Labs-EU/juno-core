import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_SPAM } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

// import SpamClearOption from './SpamClearOption'

const Spam = () => {
  useSetCurrentLabel()

  return (
    <Layout
      activePage={ACTIVE_PAGE_HEADER.spam}
      // additionalHeader={<SpamClearOption />}
      headerTitle={HEADER_SPAM}
    >
      <EmailList />
    </Layout>
  )
}

export default Spam
