import NavControls from '../MainHeader/Navigation/NavControls'
import { useHistory } from 'react-router-dom'

const SENT_HEADER = 'Sent'
const BACK_BUTTON = 'Back'

const SentHeader = () => {
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
          <h2>{SENT_HEADER}</h2>
        </div>
        <NavControls />
      </div>
    </div>
  )
}

export default SentHeader
