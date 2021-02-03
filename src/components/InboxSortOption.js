import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../constants/routes.json'
import './InboxSortOption.scss'

function SortInbox() {
  return (
    <div className="sort-container">
      <div className="sort-button">
        <p className="sort-item">Sort inbox</p>
      </div>
    </div>
  )
}

export default SortInbox
