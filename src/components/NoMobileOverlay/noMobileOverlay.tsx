import LogoutOption from 'components/MainHeader/Navigation/More/Options/LogoutOption'
import * as local from 'constants/noMobileOverlayConstants'

import * as S from './noMobileOverlayStyles'

const NoMobileOverlay = () => (
  <S.Wrapper>
    <S.Inner>
      <h1>{local.HEADER}</h1>
      <p className="text_muxed">{local.CONTENT}</p>
      <LogoutOption />
    </S.Inner>
  </S.Wrapper>
)

export default NoMobileOverlay
