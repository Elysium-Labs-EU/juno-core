import React from 'react'
import * as S from './SettingStyles'
import * as GS from '../../styles/globalStyles'
import * as local from '../../constants/settingsConstants'
import Logout from './Logout'

const Settings = () => {
  return (
    <GS.OuterContainer>
      <S.SettingsWrapper>
        <S.SettingsContainer>
          <h1>{local.HEADER}</h1>
          <Logout />
        </S.SettingsContainer>
      </S.SettingsWrapper>
    </GS.OuterContainer>
  )
}

export default Settings
