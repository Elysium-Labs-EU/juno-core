import CustomButton from 'components/Elements/Buttons/CustomButton'
import userApi from 'data/userApi'
import handleUserTokens from 'utils/handleUserTokens'

import * as S from '../NavigationMoreStyles'

export const handleLogout = () => {
  userApi().logoutUser()
  handleUserTokens().removeAllAuthTokens()
  window.location.reload()
}

interface ILogoutOption {
  asRegularButton?: boolean
}

const LOGOUT_LABEL = 'Logout'

const LogoutOption = ({ asRegularButton = false }: ILogoutOption) =>
  asRegularButton ? (
    <CustomButton attention onClick={handleLogout} label={LOGOUT_LABEL} />
  ) : (
    <S.MenuItemButton onClick={handleLogout} type="button">
      {LOGOUT_LABEL}
    </S.MenuItemButton>
  )

export default LogoutOption
