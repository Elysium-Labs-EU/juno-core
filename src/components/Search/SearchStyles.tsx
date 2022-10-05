import styled from 'styled-components'

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  width: 825px;
  max-height: calc(100vh - 225px);
  min-height: 400px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  outline: 0;
`

export const Icon = styled.div`
  padding-right: 1rem;
  display: flex;
  place-items: center;
`

export const InputRow = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 15px 30px;
`

export const InfoAndButton = styled.div`
  display: flex;
  flex-flow: row;
`

export const NoSearchResults = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 20px;
    text-align: center;
  }
`

export const SearchResults = styled.div`
  position: relative;
  -webkit-box-flex: 1;
  flex-grow: 1;
  overflow-y: auto;
  border-top: 1px solid var(--color-neutral-200);
`

export const FooterRow = styled.div`
  display: flex;
  flex-flow: row;
  height: 3rem;
  justify-content: center;
  padding-bottom: 0.5rem;
  user-select: none;
`
