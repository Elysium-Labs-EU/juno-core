import NavControls from '../MainHeader/Navigation/NavControls'
import SpamClearOption from './SpamClearOption'

const SPAM_HEADER = 'Spam'

const SpamHeader = () => {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <div className="header-center">
          <h2>{SPAM_HEADER}</h2>
        </div>
        <NavControls />
      </div>
      <SpamClearOption />
    </div>
  )
}

export default SpamHeader
