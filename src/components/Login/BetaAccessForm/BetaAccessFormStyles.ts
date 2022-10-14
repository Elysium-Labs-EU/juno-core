import styled from 'styled-components'
import { breakPoint } from '../../../constants/themeConstants'

export const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  @media only screen and (max-width: ${breakPoint.md}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

export const StyledInput = styled.input`
  background-color: var(--color-neutral-100);
  border-radius: var(--radius-m);
  border: 1px solid var(--color-neutral-500);
  box-sizing: border-box;
  flex-grow: 1;
  height: 60px;
  margin-right: 10px;
  outline-width: 0;
  padding: 10px;
  @media only screen and (max-width: ${breakPoint.md}) {
    margin: 10px 0 20px;
    width: 100%;
  }
`

export const SubmitButton = styled.button`
  background-color: rgb(251, 146, 60);
  border-radius: var(--radius-m);
  border: 1px solid transparent;
  color: var(--color-white);
  font-size: 1rem;
  padding: 20px;
  &:hover {
    background-color: rgb(249, 115, 22);
  }
  @media only screen and (max-width: ${breakPoint.md}) {
    padding: 10px;
    width: 100%;
  }
`

export const LoadingIconContainer = styled.div`
  display: flex;
  place-content: center;
  span {
    margin-right: 10px;
  }
`

export const StyledLink = styled.a`
  align-items: center;
  color: var(--color-black);
  display: flex;
  flex-direction: row;
  font-weight: 400;
  span {
    margin-left: 5px;
  }
`

export const SuccessMessage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`
