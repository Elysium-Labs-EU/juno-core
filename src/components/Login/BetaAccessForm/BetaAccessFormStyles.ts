import styled from 'styled-components'

export const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`

export const StyledInput = styled.input`
  background-color: var(--color-white-off);
  border-radius: var(--radius-m);
  border: 1px solid var(--color-grey);
  box-sizing: border-box;
  flex-grow: 1;
  height: 60px;
  margin-right: 10px;
  outline-width: 0;
  padding: 10px;
`

export const SubmitButton = styled.button`
  background-color: rgb(251, 146, 60);
  border-radius: var(--radius-m);
  border: none;
  color: var(--color-white);
  font-size: 1rem;
  padding: 20px;
  &:hover {
    background-color: rgb(249, 115, 22);
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
