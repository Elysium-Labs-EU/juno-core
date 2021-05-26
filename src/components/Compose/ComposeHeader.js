import BackButton from './../BackButton'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'

const COMPOSE = 'Compose'

const ComposeHeader = () => {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <BackButton />
        <div className="header-center">
          <h2>{COMPOSE}</h2>
        </div>
        <NavControls />
      </div>
    </div>
  )
}

export default ComposeHeader
