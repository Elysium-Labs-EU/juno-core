import EmailList from 'components/EmailList/EmailList'
import InboxSortOption from 'components/Inbox/InboxSortOption'
import Layout from 'components/Layout/Layout'
import * as S from 'components/MainHeader/HeaderStyles'
import { ACTIVE_PAGE_HEADER } from 'constants/globalConstants'
import * as local from 'constants/todoConstants'
import useSetCurrentLabel from 'hooks/useSetCurrentLabel'
import { useAppSelector } from 'store/hooks'
import { selectIsFlexibleFlowActive } from 'store/utilsSlice'

import TodoFocusOption from './TodoFocusOption'

const Todo = () => {
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  useSetCurrentLabel()

  return (
    <Layout
      activePage={ACTIVE_PAGE_HEADER.todo}
      headerTitle={local.HEADER_TODO}
      additionalHeader={
        !isFlexibleFlowActive ? (
          <S.StrictFlowButtonContainer>
            <TodoFocusOption />
            <InboxSortOption />
          </S.StrictFlowButtonContainer>
        ) : (
          <S.StrictFlowButtonContainer>
            <TodoFocusOption />
          </S.StrictFlowButtonContainer>
        )
      }
    >
      <EmailList />
    </Layout>
  )
}

export default Todo
