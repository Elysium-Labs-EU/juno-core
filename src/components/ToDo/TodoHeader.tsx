import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import TodoFocusOption from './TodoFocusOption'
import * as local from '../../constants/todoConstants'
import * as S from '../MainHeader/HeaderStyles'
import * as GS from '../../styles/globalStyles'

const TodoHeader = () => (
  <GS.OuterContainer>
    <S.NavContainer>
      <div className="header-center">
        <h2>{local.HEADER_TODO}</h2>
      </div>
      <NavControls />
    </S.NavContainer>
    <TodoFocusOption />
  </GS.OuterContainer>
)

export default TodoHeader
