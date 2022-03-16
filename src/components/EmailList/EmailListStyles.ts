import styled from 'styled-components'

export const Scroll = styled.div`
  position: relative;
  width: 100%;
  height: 82vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const LoadMoreContainer = styled.div`
  margin-bottom: 3rem;
  justify-content: center;
  display: flex;
`

export const UnavailableContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const ThreadList = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 88px;
  padding-top: 44px;
`
