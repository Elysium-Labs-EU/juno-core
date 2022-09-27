import * as S from './GeneralStyles'
import * as SS from '../SettingsStyles'
import EmailSize from './EmailSize/EmailSize'
import ShowAvatar from './ShowAvatar/ShowAvatar'
import StrictFlow from './StrictFlow/StrictFlow'
import AlternateActions from './AlternateActions/AlternateActions'
import SentryToggle from './SentryToggle/SentryToggle'

const TITLE = 'General'

const General = () => (
  <S.Wrapper>
    <SS.SettingsSubHeader>{TITLE}</SS.SettingsSubHeader>
    <ShowAvatar />
    <EmailSize />
    <StrictFlow />
    <AlternateActions />
    <SentryToggle />
  </S.Wrapper>
)

export default General
