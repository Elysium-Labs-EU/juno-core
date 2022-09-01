import * as S from './GeneralStyles'
import * as SS from '../SettingsStyles'
import EmailSize from './EmailSize/EmailSize'
import ShowAvatar from './ShowAvatar/ShowAvatar'

const TITLE = 'General'

const General = () => (
  <S.Wrapper>
    <SS.SettingsSubHeader>{TITLE}</SS.SettingsSubHeader>
    <ShowAvatar />
    <EmailSize />
  </S.Wrapper>
)

export default General
