import styled from 'styled-components'

export const AttachmentWrapper = styled.div`
  display: flex;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-m);
  background-color: transparent;
  width: 100%;
  &:hover {
    box-shadow: var(--box-shadow-low);
  }
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow: 0.15s ease-in-out;
`

export const Attachment = styled.div`
  border-radius: var(--radius-m);
  background-color: var(--color-neutral-100);
  width: 100%;
  display: flex;
  flex: 1 1 0%;
  justify-content: space-between;
  /* display: grid; */
  flex-flow: row;
  /* padding: 4px 8px; */
  align-items: center;
  /* margin-bottom: 8px; */
  /* grid-template-columns: 30px auto 30px 30px; */
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
`

export const AttachmentInner = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  min-width: 0px;
  padding: 10px 9px 10px 18px;
`

export const AttachmentDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  .file_name {
    font-size: var(--small);
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
  }
`

export const IconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: 0;
`

export const PreviewButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  width: 50px;
`

export const DownloadDeleteButton = styled.button`
  all: unset;
  border-top-left-radius: 0;
  border-top-right-radius: var(--radius-m);
  border-bottom-right-radius: var(--radius-m);
  border-bottom-left-radius: 0;
  background-color: var(--color-neutral-100);
  border-left: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: center;
  width: 50px;
`
