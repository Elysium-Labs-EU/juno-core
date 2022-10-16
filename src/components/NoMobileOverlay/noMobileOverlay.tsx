import * as S from './noMobileOverlayStyles'
import * as local from '../../constants/noMobileOverlayConstants'
import LogoutOption from '../MainHeader/Navigation/More/Options/LogoutOption'

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
