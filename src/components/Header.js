import ComposeHeader from './compose/ComposeHeader'
import InboxHeader from './InboxHeader'
import HomeHeader from './HomeHeader'
import { useLocation } from 'react-router-dom'

function Header() {
  function SetHeader() {
    const location = useLocation()

    if (location.pathname === '/inbox') {
      return <InboxHeader />
    } else if (location.pathname === '/compose') {
      return <ComposeHeader />
    } else {
      return <HomeHeader />
    }
  }

  return <SetHeader />
}

export default Header
