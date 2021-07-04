import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import TodoFocusOption from './TodoFocusOption'
import * as local from '../../constants/todoConstants'
import * as S from '../MainHeader/HeaderStyles'

const TodoHeader = () => {
  return (
    <div className="tlOuterContainer">
      <S.NavContainer>
        <div className="header-center">
          <h2>{local.HEADER_TODO}</h2>
        </div>
        <NavControls />
      </S.NavContainer>
      <TodoFocusOption />
    </div>
  )
}

export default TodoHeader
