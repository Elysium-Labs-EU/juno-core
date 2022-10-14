import Navigation from '../MainHeader/Navigation/Navigation'
import TodoFocusOption from './TodoFocusOption'
import * as local from '../../constants/todoConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'
import { useAppSelector } from '../../store/hooks'
import { selectIsFlexibleFlowActive } from '../../store/utilsSlice'
import { selectEmailList, selectActiveEmailListIndex } from '../../store/emailListSlice'
import InboxSortOption from '../Inbox/InboxSortOption'
import getEmailListTimeStamp from '../../utils/getEmailListTimeStamp'

const TodoHeader = () => {
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle title={getEmailListTimeStamp(emailList, activeEmailListIndex)}>{local.HEADER_TODO}</S.PageTitle>
        </S.HeaderCenter>
        <Navigation />
      </S.NavContainer>
      {!isFlexibleFlowActive ? (
        <S.StrictFlowButtonContainer>
          <TodoFocusOption />
          <InboxSortOption />
        </S.StrictFlowButtonContainer>
      ) : (
        <S.StrictFlowButtonContainer>
          <TodoFocusOption />
        </S.StrictFlowButtonContainer>
      )}
    </GS.OuterContainer>
  )
}

export default TodoHeader
