import LogoutOption from 'components/MainHeader/Navigation/More/Options/LogoutOption'
import * as local from 'constants/noMobileOverlayConstants'
import { Paragraph } from 'styles/globalStyles'

import * as S from './noMobileOverlayStyles'

const NoMobileOverlay = () => (
  <S.Wrapper>
    <S.Inner>
      <h1>{local.HEADER}</h1>
      <Paragraph muted="true">{local.CONTENT}</Paragraph>
      <LogoutOption />
    </S.Inner>
  </S.Wrapper >
)

export default NoMobileOverlay
