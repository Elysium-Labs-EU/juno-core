import styled from 'styled-components'

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
