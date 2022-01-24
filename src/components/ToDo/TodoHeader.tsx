import Navigation from '../MainHeader/Navigation/Navigation'
import TodoFocusOption from './TodoFocusOption'
import * as local from '../../constants/todoConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const TodoHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <S.HeaderCenter>
        <S.PageTitle>{local.HEADER_TODO}</S.PageTitle>
      </S.HeaderCenter>
      <Navigation />
    </S.NavContainer>
    <TodoFocusOption />
  </GS.OuterContainer>
)

export default TodoHeader
