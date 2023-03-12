import styled from 'styled-components'

export const EditorWrapper = styled.div`
  background-color: var(--color-white);
  border-radius: var(--radius-m);
  border: 2px solid var(--color-neutral-300);
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: var(--spacing-2) 0;
  max-height: 400px;
  min-height: 200px;
  width: 100%;
  div {
    .ProseMirror {
      height: 100%;
      min-height: 200px;
      outline: 0;
      padding: 0 var(--spacing-1-5);
    }
  }
`

export const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 2;
  justify-content: center;
`
