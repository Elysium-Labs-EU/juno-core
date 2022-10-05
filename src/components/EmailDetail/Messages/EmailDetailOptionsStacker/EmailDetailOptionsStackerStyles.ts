import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

interface IButtonWrapper {
  altActive: boolean
}

export const ButtonWrapper = styled.div<IButtonWrapper>`
  position: relative;

  .first-option {
    animation: ${({ altActive }) =>
      altActive
        ? 'goUpAndDown 0.32s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        : null};
    z-index: ${({ altActive }) => (altActive ? 0 : 1)};
    @keyframes goUpAndDown {
      0% {
        transform: translateY(4px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(4px);
      }
    }
  }

  .second-option {
    animation: ${({ altActive }) =>
      altActive
        ? 'goDownAndUp 0.32s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
        : null};
    z-index: ${({ altActive }) => (altActive ? 1 : 0)};

    @keyframes goDownAndUp {
      0% {
        transform: translateY(4px);
      }
      50% {
        transform: translateY(24px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`

export const FirstOptionContainer = styled.div`
  position: relative;
  background-color: var(--color-neutral-100);
`

export const SecondOptionContainer = styled.div`
  position: absolute;
  background-color: var(--color-neutral-100);
  left: 0;
  top: 0;
`

export const StackIndicator = styled.div`
  margin-left: 10px;
`
