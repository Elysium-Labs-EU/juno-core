import styled from 'styled-components'

export const Wrapper = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  right: 1rem;
  bottom: 0;
  z-index: 10;
  transition: opacity 0.2s ease-in-out;
  display: flex;
  place-content: center;
  padding-left: 5rem;
  padding-right: 2rem;

  &:hover {
    opacity: 1;
    background: var(--color-neutral-200);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0) 0%,
      rgba(226, 226, 226, 1) 25%
    );
  }
`

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-left: 1rem;
  }
`
