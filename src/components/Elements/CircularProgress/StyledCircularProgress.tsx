import { FiLoader } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

interface IRotatingIcon {
  size: number
}

// TODO: Fix the animation when using in the context of a button

const RotatingIcon = styled.span<IRotatingIcon>`
  animation: ${rotate} 1s cubic-bezier(0.79, 0.33, 0.32, 0.6) infinite;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

// animation: animation-61bdi0 1.4s linear infinite;
//     animation-duration: 1.4s;
//     animation-timing-function: linear;
//     animation-delay: 0s;
//     animation-iteration-count: infinite;
//     animation-direction: normal;
//     animation-fill-mode: none;
//     animation-play-state: running;
//     animation-name: animation-61bdi0;

const StyledCircularProgress = ({ size = 18 }: { size?: number }) => (
  <RotatingIcon size={size}>
    <FiLoader size={size} color="var(--color-neutral-400)" />
  </RotatingIcon>
)

export default StyledCircularProgress
