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
    background-color: var(--color-neutral-300);
    border: 1px solid var(--color-neutral-500);
    display: block;
    padding: 2px 9px 5px;
    margin-right: 3px;
    border-radius: 4px;
    cursor: default;
    min-width: 14px;
    min-height: 14px;
    text-align: center;
    -webkit-box-shadow: inset 0 -4px 0 var(--color-neutral-500);
    box-shadow: inset 0 -4px 0 var(--color-neutral-500);
    box-sizing: border-box;
  }
  display: flex;
  flex-flow: row;
  margin-top: 5px;
`
