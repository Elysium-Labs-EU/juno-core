import styled from 'styled-components'

export const Dialog = styled.div`
  background-color: var(--color-white);
  border-radius: var(--radius-m);
  box-shadow: var(--box-shadow-low);
  display: flex;
  flex-direction: column;
  left: 50%;
  max-height: calc(100vh - 225px);
  min-height: 400px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 825px;
  z-index: var(--z-index-modal);
`

export const Icon = styled.div`
  display: flex;
  padding-right: 10px;
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
`

export const SearchOuput = styled.div`
  -webkit-box-flex: 1;
  border-top: 1px solid var(--color-neutral-200);
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
`

export const FooterRow = styled.div`
  display: flex;
  flex-flow: row;
  height: 3rem;
  justify-content: center;
  padding-bottom: 0.5rem;
  user-select: none;
`
