import ComposeHeader from './Compose/ComposeHeader'
import InboxHeader from './Inbox/InboxHeader'
import TodoHeader from './ToDo/TodoHeader'
import EmailDetailHeader from './EmailDetail/EmailDetailHeader'
import { useLocation } from 'react-router-dom'

function Header() {
  const SetHeader = () => {
    const location = useLocation()

    if (location.pathname === '/inbox') {
      return <InboxHeader />
    } else if (location.pathname === '/compose') {
      return <ComposeHeader />
    } else if (location.pathname === '/') {
      return <TodoHeader />
    } else {
      return <EmailDetailHeader />
    }
  }

  return <SetHeader />
}

export default Header
