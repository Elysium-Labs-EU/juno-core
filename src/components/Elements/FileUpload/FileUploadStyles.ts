import styled from 'styled-components'

export const Wrapper = styled.div`
  border-radius: var(--radius-m);
  border: 2px solid transparent;
  color: var(--color-neutral-500);
  padding: var(--spacing-1) var(--spacing-2);
  &:hover,
  &:focus {
    border-color: var(--color-blue-100);
    color: var(--color-black);
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const Inner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  // TODO: Reverse control by setting this on the P global?
  p {
    font-size: var(--text-small);
    margin-left: var(--spacing-1);
    text-align: center;
  }
`
