import Stack from 'components/Elements/Stack/Stack'
import EmailList from 'components/EmailList/EmailList'
import InboxSortOption from 'components/Inbox/InboxSortOption'
import Layout from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER, HEADER_TODO } from 'constants/globalConstants'
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
      additionalHeader={
        <Stack align="center" justify="center">
          <TodoFocusOption />
          {!isFlexibleFlowActive ? <InboxSortOption /> : null}
        </Stack>
      }
      headerTitle={HEADER_TODO}
    >
      <EmailList hasLargeHeader />
    </Layout>
  )
}

export default Todo
