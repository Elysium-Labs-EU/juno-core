import React from 'react'
import Navigation from '../MainHeader/Navigation/Navigation'
import TodoFocusOption from './TodoFocusOption'
import * as local from '../../constants/todoConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const TodoHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <div className="header-center">
        <S.PageTitle>{local.HEADER_TODO}</S.PageTitle>
      </div>
      <Navigation />
    </S.NavContainer>
    <TodoFocusOption />
  </GS.OuterContainer>
)

export default TodoHeader
