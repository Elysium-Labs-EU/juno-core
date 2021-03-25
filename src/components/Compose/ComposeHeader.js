import BackButton from './../BackButton'
import NavControls from './../NavControls'
import './../NavControls.scss'

function ComposeHeader() {
  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <BackButton />
        <div className="header-center">
          <h2>Compose</h2>
        </div>
        <NavControls />
      </div>
    </div>
  )
}

export default ComposeHeader
