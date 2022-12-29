import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--color-neutral-100);
  border: 2px solid transparent;
  padding: 10px 20px;
  border-radius: var(--radius-m);
  color: var(--color-neutral-500);
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
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin-left: 10px;
    text-align: center;
    font-size: var(--small);
  }
`
