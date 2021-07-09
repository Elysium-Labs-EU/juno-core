import React from 'react'
import { Link } from 'react-router-dom'
import { InnerMenu, MenuItem, Wrapper } from './SubMenuHeaderStyles'
import * as local from '../../constants/subMenuHeaderConstants'

const Submenuheader = () => {
  return (
    <Wrapper>
      {local.MENU_OPTIONS &&
        local.MENU_OPTIONS.map((item, index) => {
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
