import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavControls.scss'
import { FiClipboard, FiEdit, FiInbox, FiSettings } from 'react-icons/fi'
import { CustomIconLink } from '../Elements'

const Navigation = () => {
  const [active, setActive] = useState('')
  const location = useLocation()

  useEffect(() => {
    if (location) {
      if (location.pathname.includes('inbox')) {
        setActive('inbox')
      } else if (location.pathname.includes('settings')) {
        setActive('settings')
      } else if (location.pathname.includes('compose')) {
        setActive('compose')
      } else if (location.pathname.includes('drafts')) {
        setActive('drafts')
      }
    }
  }, [location])

  return (
    <div className="nav-controls">
      <div className="nav-c-item">
        <Link to="/inbox">
          <CustomIconLink
            className={
              active === 'inbox'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiInbox />}
          />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/settings">
          <CustomIconLink
            className={
              active === 'settings'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiSettings />}
          />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/compose">
          <CustomIconLink
            className={
              active === 'compose'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiEdit />}
          />
        </Link>
      </div>
      <div className="nav-c-item">
        <Link to="/drafts">
          <CustomIconLink
            className={
              active === 'drafts'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiClipboard />}
          />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
