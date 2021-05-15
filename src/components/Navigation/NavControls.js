import React from 'react'
import { Link } from 'react-router-dom'
import './NavControls.scss'
import { FiEdit, FiInbox, FiSettings } from 'react-icons/fi'
import { CustomIconLink } from '../Elements/CustomIconLink'

const Navigation = () => {
  return (
    <div className="nav-controls">
      <div className="nav-c-item">
        <Link to="/inbox">
          <CustomIconLink className="nav-item-button" icon={<FiInbox />} />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/settings">
          <CustomIconLink className="nav-item-button" icon={<FiSettings />} />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/compose">
          <CustomIconLink className="nav-item-button" icon={<FiEdit />} />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
