import * as local from '../../constants/todoConstants'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from '../../store/emailListSlice'
import { useAppSelector } from '../../store/hooks'
import { selectIsFlexibleFlowActive } from '../../store/utilsSlice'
import * as GS from '../../styles/globalStyles'
import getEmailListTimeStamp from '../../utils/getEmailListTimeStamp'
import InboxSortOption from '../Inbox/InboxSortOption'
import * as S from '../MainHeader/HeaderStyles'
import Navigation from '../MainHeader/Navigation/Navigation'
import TodoFocusOption from './TodoFocusOption'

const TodoHeader = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const emailList = useAppSelector(selectEmailList)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)

  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle
            title={getEmailListTimeStamp(emailList, activeEmailListIndex)}
          >
            {local.HEADER_TODO}
          </S.PageTitle>
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
