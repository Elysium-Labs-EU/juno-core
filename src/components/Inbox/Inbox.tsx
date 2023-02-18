import EmailList from 'components/EmailList/EmailList'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_INBOX } from 'constants/globalConstants'

import useSetCurrentLabel from 'hooks/useSetCurrentLabel'

import InboxRefreshOption from './InboxRefreshOption'
import InboxSortOption from './InboxSortOption'
import * as S from './InboxStyles'

const Inbox = () => {
  useSetCurrentLabel()

  return (
    <Layout
      activePage={ACTIVE_PAGE_HEADER.inbox}
      headerTitle={HEADER_INBOX}
      additionalHeader={
        <S.OptionsContainer>
          <div />
          <S.SortOptionWrapper>
            <InboxSortOption />
          </S.SortOptionWrapper>
          <S.RefreshOptionWrapper>
            <InboxRefreshOption />
          </S.RefreshOptionWrapper>
        </S.OptionsContainer>
      }
    >
      <EmailList />
    </Layout>
  )
}

export default Inbox
