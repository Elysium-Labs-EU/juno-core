import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

import SpamClearOption from './SpamClearOption'

const Spam = () => {
  useSetCurrentLabel()

  return (
    <Layout
      activePage={ACTIVE_PAGE_HEADER.spam}
      additionalHeader={<SpamClearOption />}
      headerTitle="SPAM"
    >
      <EmailList />
    </Layout>
  )
}

export default Spam
