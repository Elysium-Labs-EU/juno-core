import NavControls from '../MainHeader/Navigation/NavControls'
import TodoFocusOption from './TodoFocusOption'

const TODO_HEADER = 'To Do'

const TodoHeader = () => {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <div className="header-center">
          <h2>{TODO_HEADER}</h2>
        </div>
        <NavControls />
      </div>
      <TodoFocusOption />
    </div>
  )
}

export default TodoHeader
