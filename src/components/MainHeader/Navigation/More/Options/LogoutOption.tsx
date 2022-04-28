import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'
import handleUserTokens from '../../../../../utils/handleUserTokens'

export const handleLogout = () => {
  handleUserTokens().removeAllTokens()
  window.location.reload()
}

const LogoutOption = () => (
  <S.MenuItemButton onClick={handleLogout} type="button">
    {local.LOGOUT}
  </S.MenuItemButton>
)

export default LogoutOption
