import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../constants/routes.json'
import './Menu.scss'

function Menu() {
  return (
    <div className="menu-container">
      <Link className="menu-item" to="/">
        Messages
      </Link>
      <Link className="menu-item" to="/FileOverview">
        Files
      </Link>
      <Link className="menu-item" to="/InformationOverview">
        Information
      </Link>
    </div>
  )
}

export default Menu
