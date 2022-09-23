import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: var(--color-white-off);
  border: 2px solid transparent;
  padding: 10px 20px;
  border-radius: var(--radius-m);
  color: var(--color-grey);
  &:hover,
  &:focus {
    border-color: var(--color-purple-soft);
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
  flex-flow: row;
  align-items: center;
  p {
    margin-left: 10px;
    text-align: center;
    font-size: var(--small-size);
  }
`
