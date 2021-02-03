import BackButton from './BackButton'
import NavControls from './NavControls'
import InboxSortOption from './InboxSortOption'
import './NavControls.scss'

function InboxHeader() {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <BackButton />
        <div className="header-center">
          <h2>Inbox</h2>
        </div>
        <NavControls />
      </div>
      <InboxSortOption />
    </div>
  )
}

export default InboxHeader
