import React from 'react'
import { useHistory } from 'react-router-dom'
import NavControls from '../MainHeader/Navigation/NavControls'
import '../MainHeader/Navigation/NavControls.scss'
import * as local from '../../constants/draftConstants'
import * as global from '../../constants/globalConstants'

const InboxHeader = () => {
  const history = useHistory()

  const navigateBack = () => {
    history.push('/')
  }

  return (
    <div className="tlOuterContainer">
      <div className="nav-container">
        <button
          className="btn btn-sm btn-light"
          onClick={navigateBack}
          type="button"
        >
          {global.BUTTON_BACK}
        </button>
        <div className="header-center">
          <h2>{local.DRAFT_HEADER}</h2>
        </div>
        <NavControls />
      </div>
    </div>
  )
}

export default InboxHeader
