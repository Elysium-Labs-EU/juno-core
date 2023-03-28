import * as S from 'components/BaseLoader/BaseLoaderStyles'
import AnimatedMountUnmount from 'components/Elements/AnimatedMountUnmount'
import { BETA_VERSION } from 'constants/globalConstants'
import Logo from 'images/Juno_logo_dark.png'
import { Span } from 'styles/globalStyles'

import { LOGO_ALT } from './BaseLoaderConstants'
import type { ILoadingComponent } from './BaseLoaderTypes'

const LoadingComponent = ({ hasError }: ILoadingComponent) =>
  !hasError ? (
    <>
      <AnimatedMountUnmount>
        <S.Container>
          <img src={Logo} alt={LOGO_ALT} />
        </S.Container>
      </AnimatedMountUnmount>
      <S.LoaderContainer>
        <S.StyledLinearProgress />
      </S.LoaderContainer>
      <Span muted>{BETA_VERSION}</Span>
    </>
  ) : null

export default LoadingComponent
