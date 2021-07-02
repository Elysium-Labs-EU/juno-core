import React from 'react'
import NavControls from '../MainHeader/Navigation/NavControls'
import TodoFocusOption from './TodoFocusOption'
import * as local from '../../constants/todoConstants'

const TodoHeader = () => {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <div className="header-center">
          <h2>{local.HEADER_TODO}</h2>
        </div>
        <NavControls />
      </div>
      <TodoFocusOption />
    </div>
  )
}

export default TodoHeader
