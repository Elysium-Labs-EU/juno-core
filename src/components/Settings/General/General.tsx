import AlternateActions from 'components/Settings/General/AlternateActions/AlternateActions'
import EmailSize from 'components/Settings/General/EmailSize/EmailSize'
import SentryToggle from 'components/Settings/General/SentryToggle/SentryToggle'
import ShowAvatar from 'components/Settings/General/ShowAvatar/ShowAvatar'
import StrictFlow from 'components/Settings/General/StrictFlow/StrictFlow'
import * as S from 'components/Settings/SettingsStyles'

const TITLE = 'General'

const General = () => (
  <S.SettingsInnerContainer>
    <S.SettingsSubHeader>{TITLE}</S.SettingsSubHeader>
    <ShowAvatar />
    <EmailSize />
    <StrictFlow />
    <AlternateActions />
    <SentryToggle />
  </S.SettingsInnerContainer>
)

export default General
