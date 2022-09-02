import * as S from './GeneralStyles'
import * as SS from '../SettingsStyles'
import EmailSize from './EmailSize/EmailSize'
import ShowAvatar from './ShowAvatar/ShowAvatar'
import StrictFlow from './StrictFlow/StrictFlow'

const TITLE = 'General'

const General = () => (
  <S.Wrapper>
    <SS.SettingsSubHeader>{TITLE}</SS.SettingsSubHeader>
    <ShowAvatar />
    <EmailSize />
    <StrictFlow />
  </S.Wrapper>
)

export default General
