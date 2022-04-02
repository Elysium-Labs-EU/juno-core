import styled from 'styled-components'

export const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1100;
  transform: translate(-50%, -50%);
  width: 825px;
  border-radius: 5px;
  background-color: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  margin: 100px 0px 0px 0px;
  outline: 0;
`

export const HeaderRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`

export const Inner = styled.div`
  padding: 0 20px;
  display: flex;
  flex-flow: column;
`

export const Columns = styled.div`
  display: flex;
  flex-flow: row;
  div:first-child {
    margin-right: 40px;
  }
`

export const SectionContainer = styled.div`
  padding: 8px;
  padding-top: 8px;
  margin: 8px 0;
  margin-top: 8px;
  width: 100%;
`

export const KeyComboContainer = styled.div`
  margin: 12px 0;
`

export const KeyBindShortcut = styled.div`
  span {
    background-color: var(--color-grey-border);
    border: 1px solid var(--color-grey);
    display: block;
    padding: 3px 6px 4px;
    margin-right: 3px;
    border-radius: 4px;
    cursor: default;
    min-width: 14px;
    min-height: 14px;
    text-align: center;
    -webkit-box-shadow: inset 0 -4px 0 var(--color-grey);
    box-shadow: inset 0 -4px 0 var(--color-grey);
    box-sizing: border-box;
  }
  display: flex;
  flex-flow: row;
`

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1100;
  margin-bottom: 40px;
  margin-right: 40px;
`
