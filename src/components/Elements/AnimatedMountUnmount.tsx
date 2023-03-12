import type { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow: hidden;
`

const StyledAnimatedMountUnmount = styled.div`
  animation: fadeInUp 0.3s both;
  opacity: 0;
  position: relative;
  transform: translateY(10px);
  transform: translateZ(0) rotate(0deg) scaleY(1);
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Animation */
  @keyframes fadeInUp {
    0% {
      transform: translate3d(0, 20px, 0);
    }

    90% {
      transform: translate3d(0, -2px, 0);
    }

    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`

const AnimatedMountUnmount = ({ children }: { children: ReactNode }) => (
  <Wrapper>
    <StyledAnimatedMountUnmount>{children}</StyledAnimatedMountUnmount>
  </Wrapper>
)

export default AnimatedMountUnmount
