import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'

import handleUserTokens from '../../../../../utils/handleUserTokens'

const LogoutOption = () => {
  const handleLogout = () => {
    handleUserTokens().removeBothTokens()
    window.location.reload()
  }

  return (
    <S.MenuItemButton onClick={handleLogout} type="button">
      {local.LOGOUT}
    </S.MenuItemButton>
  )
}

export default LogoutOption
