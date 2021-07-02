import styled from 'styled-components'

export const SortContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  margin: 2rem 0;
  padding: 0 1rem;
`

export const SortButton = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #8e23d1;
  margin-left: 43.5%;
  div {
    margin: 0.4rem 0.8rem;
    span {
      color: #fdfdfd;
      font-size: 1rem;
    }
  }

  &:hover {
    border-radius: 20px;
    background-color: #8e23d1;
  }
`
