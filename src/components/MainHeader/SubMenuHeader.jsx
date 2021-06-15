import React from 'react'
import { Link } from 'react-router-dom'
import { InnerMenu, MenuItem, Wrapper } from './SubMenuHeaderStyles'

const Submenuheader = () => {
  const MenuOptions = [
    { link: '/drafts', name: 'Drafts' },
    { link: '/sent', name: 'Sent' },
    { link: '/spam', name: 'Spam' },
  ]

  return (
    <Wrapper>
      {MenuOptions &&
        MenuOptions.map((item, index) => {
          return (
            <InnerMenu key={`${item.name + index}`}>
              <Link className="option-link" to={item.link}>
                {item.name}
              </Link>
            </InnerMenu>
          )
        })}
    </Wrapper>
  )
}

export default Submenuheader
