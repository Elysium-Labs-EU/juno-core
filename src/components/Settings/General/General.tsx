import * as S from '../SettingsStyles'
import EmailSize from './EmailSize/EmailSize'
import ShowAvatar from './ShowAvatar/ShowAvatar'
import StrictFlow from './StrictFlow/StrictFlow'
import AlternateActions from './AlternateActions/AlternateActions'
import SentryToggle from './SentryToggle/SentryToggle'

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
