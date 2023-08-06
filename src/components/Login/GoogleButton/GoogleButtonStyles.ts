import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 32px 64px;
  box-shadow: 0 1px 2px 0 rgb(9 30 66 / 25%);
`

interface StyledButton {
  isActive: boolean
  showLoadingState: boolean
}

export const StyledButton = styled.button<StyledButton>`
  align-items: center;
  background-color: ${({ isActive }) =>
    isActive ? `var(--color-neutral-800)` : `var(--color-black)`};
  border-radius: var(--radius-m);
  border: none;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  color: var(--color-white);
  cursor: ${({ showLoadingState }) =>
    showLoadingState ? 'progress' : 'pointer'};
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: var(--text-regular);
  font-weight: 500;
  justify-content: center;
  padding: var(--spacing-1-5) var(--spacing-2);
  text-decoration: none;
  transition: background-color 0.3s, box-shadow 0.3s;
  user-select: none;

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: var(--color-neutral-800);
  }

  &:focus {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    background-color: var(--color-neutral-200);
    box-shadow: none;
    cursor: default;
  }
`

export const IconContainer = styled.div`
  padding-right: var(--spacing-1);
  display: flex;
`

export const TextContainer = styled.div`
  padding-left: var(--spacing-1);
`
