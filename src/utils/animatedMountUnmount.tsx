import { ReactNode } from 'react'
import styled from 'styled-components'

export const StyledAnimatedMountUnmount = styled.div`
  transform: translateY(10px);
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  opacity: 0;
  transform: translateZ(0) rotate(0deg) scaleY(1);
  animation: fadeInUp 0.3s both;

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
  <StyledAnimatedMountUnmount>{children}</StyledAnimatedMountUnmount>
)

export default AnimatedMountUnmount
