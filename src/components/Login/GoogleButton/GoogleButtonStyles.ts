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

export const StyledButton = styled.button`
  transition: background-color 0.3s, box-shadow 0.3s;

  padding: 12px 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-white);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  user-select: none;
  background-color: var(--color-black);
  cursor: pointer;

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    background-color: var(--color-grey-hover);
    box-shadow: none;
    cursor: default;
  }
`

export const IconContainer = styled.div`
  padding-right: 8px;
  display: flex;
`

export const TextContainer = styled.div`
  padding-left: 8px;
`
