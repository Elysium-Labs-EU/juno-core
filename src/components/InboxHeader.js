import BackButton from './BackButton'
import NavControls from './Navigation/NavControls'
import InboxSortOption from './InboxSortOption'
import './Navigation/NavControls.scss'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <BackButton />
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
