import { useHistory } from 'react-router-dom'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'

const DRAFT_HEADER = 'Drafts'
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
          <h2>{DRAFT_HEADER}</h2>
        </div>
        <NavControls />
      </div>
    </div>
  )
}

export default InboxHeader
