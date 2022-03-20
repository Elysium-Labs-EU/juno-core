import styled from 'styled-components'
import * as S from './noMobileOverlayStyles'
import * as local from '../../constants/noMobileOverlayConstants'

const H1 = styled.h1`
  font-size: var(--h1);
`

const NoMobileOverlay = () => (
  <S.Wrapper>
    <S.Inner>
      <H1>{local.HEADER}</H1>
      <p className="text_muxed">{local.CONTENT}</p>
    </S.Inner>
  </S.Wrapper>
)

export default NoMobileOverlay
