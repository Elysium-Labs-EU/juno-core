import React from 'react'
import {InnerMenu, MenuItem, Wrapper} from './SubMenuHeaderStyles'
import { Link } from 'react-router-dom'

const Submenuheader = () => {
const MenuOptions = [
    { link: '/drafts', name: 'Drafts' },
    { link: '/sent', name: 'Sent' },
    { link: '/spam', name: 'Spam' },
  ]

    return (
        <Wrapper>
            {MenuOptions && MenuOptions.map((item, index) => {
                return (
                    <InnerMenu>
                    <Link className="option-link" key={index} to={item.link}>
                        {item.name}
                        </Link>
                    </InnerMenu>
                )
            })}
        </Wrapper>
    )
}

export default Submenuheader
