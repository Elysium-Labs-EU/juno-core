import { useHistory } from 'react-router-dom'
import NavControls from './../Navigation/NavControls'
import InboxSortOption from './InboxSortOption'
import './../Navigation/NavControls.scss'

const INBOX_HEADER = 'Inbox'
const BACK_BUTTON = 'Back'

const InboxHeader = () => {
  const history = useHistory()

  const navigateBack = () => {
    history.push('/')
  }

  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <button className="btn btn-sm btn-light" onClick={navigateBack}>
          {BACK_BUTTON}
        </button>
        <div className="header-center">
          <h2>{INBOX_HEADER}</h2>
        </div>
        <NavControls />
      </div>
      <InboxSortOption />
    </div>
  )
}

export default InboxHeader
