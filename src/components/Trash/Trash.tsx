import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_TRASH } from 'constants/globalConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import { P } from 'styles/globalStyles'

const INFORMATION_MESSAGE =
  'Messages that have been in the Bin for more than 30 days will be deleted automatically.'

const Trash = () => {
  useSetCurrentLabel()

  return (
    <Layout
      activePage={ACTIVE_PAGE_HEADER.more}
      headerTitle={HEADER_TRASH}
      additionalHeader={
        <P small muted>
          {INFORMATION_MESSAGE}
        </P>
      }
    >
      <EmailList />
    </Layout>
  )
}

export default Trash
