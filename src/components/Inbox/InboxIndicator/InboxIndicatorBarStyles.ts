import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  min-width: 400px;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
  /* border: 1px solid var(--color-grey);
  border-radius: var(--radius-m); */
  padding: 0 20px;
  &:hover {
    opacity: 1;
  }
`

export const TextWrapper = styled.p`
  margin-right: 60px;
  font-size: var(--small-size);
`
