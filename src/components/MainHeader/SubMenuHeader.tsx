import React from 'react'
import { Link } from 'react-router-dom'
import * as S from './SubMenuHeaderStyles'
import * as local from '../../constants/subMenuHeaderConstants'

const Submenuheader = () => (
  <S.Wrapper>
    {local.MENU_OPTIONS &&
      local.MENU_OPTIONS.map((item, index) => (
        <S.InnerMenu key={`${ item.name + index }`}>
          <Link className="option-link" to={item.link} style={{ padding: '0.2rem 0' }}>
            {item.name}
          </Link>
        </S.InnerMenu>
      ))}
  </S.Wrapper>
)

export default Submenuheader
