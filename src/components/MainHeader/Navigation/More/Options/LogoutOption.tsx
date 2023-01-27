import userApi from 'data/userApi'
import handleUserTokens from 'utils/handleUserTokens'

import * as S from '../NavigationMoreStyles'

export const handleLogout = async () => {
  const response = await userApi().logoutUser()
  if ('status' in response && response.status === 205) {
    handleUserTokens().removeAllTokens()
    window.location.reload()
  }
}

const LogoutOption = () => (
  <S.MenuItemButton onClick={handleLogout} type="button">
    Logout
  </S.MenuItemButton>
)

export default LogoutOption
