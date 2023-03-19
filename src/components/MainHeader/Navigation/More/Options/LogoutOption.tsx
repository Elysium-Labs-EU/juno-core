import userApi from 'data/userApi'
import handleUserTokens from 'utils/handleUserTokens'

import * as S from '../NavigationMoreStyles'

export const handleLogout = () => {
  userApi().logoutUser()
  handleUserTokens().removeAllAuthTokens()
  window.location.reload()
}

const LogoutOption = () => (
  <S.MenuItemButton onClick={handleLogout} type="button">
    Logout
  </S.MenuItemButton>
)

export default LogoutOption
