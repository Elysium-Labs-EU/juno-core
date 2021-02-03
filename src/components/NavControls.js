import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../constants/routes.json'

import './NavControls.scss'
import { FiEdit, FiInbox, FiSettings } from 'react-icons/fi'

function Navigation() {
  return (
    <div className="nav-controls">
      <div className="nav-c-item">
        <Link to="/inbox">
          <FiInbox />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/settings">
          <FiSettings />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/compose">
          <FiEdit />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
