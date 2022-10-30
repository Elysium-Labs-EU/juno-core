import styled from 'styled-components'

export const EditorWrapper = styled.div`
  overflow-y: auto;
  background-color: var(--color-white);
  width: 100%;
  border: 2px solid var(--color-neutral-300);
  display: flex;
  flex-flow: column;
  min-height: 200px;
  max-height: 400px;
  flex: 1;
  margin: 20px 0;
  border-radius: 4px;
  div {
    .ProseMirror {
      min-height: 200px;
      height: 100%;
      outline: 0;
      padding: 0 12px;
    }
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
`
