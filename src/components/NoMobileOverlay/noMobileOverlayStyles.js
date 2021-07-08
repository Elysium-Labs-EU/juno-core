import styled from 'styled-components'

export const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-flow: column;
  place-content: center;
  background: #f0f0f0;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`

export const Inner = styled.div`
  padding: 2rem;
  width: 90%;
  max-width: 600px;
`
