import React from 'react'
import * as S from './SubMenuHeaderStyles'
import * as local from '../../constants/subMenuHeaderConstants'
import CustomLink from '../Elements/Links/CustomLink'

const Submenuheader = () => (
  <S.Wrapper>
    {local.MENU_OPTIONS &&
      local.MENU_OPTIONS.map((item, index) => (
        <S.InnerMenu key={`${ item.name + index }`}>
          <CustomLink to={item.link} label={item.name} />
        </S.InnerMenu>
      ))}
  </S.Wrapper>
)

export default Submenuheader
