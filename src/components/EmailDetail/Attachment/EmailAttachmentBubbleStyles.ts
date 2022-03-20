import styled from 'styled-components'
import * as themeConstants from '../../../constants/themeConstants'

export const Attachment = styled.div`
  border-radius: 6px;
  border: 1px solid ${themeConstants.colorGreyHover};
  background-color: ${themeConstants.colorOffWhite};
  cursor: pointer;
  display: flex;
  flex-flow: row;
  max-width: max-content;
  padding: 0.2rem 0.5rem;
  align-items: center;
  margin-left: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease 0s, border-color 0.2s ease 0s,
    color 0.2s ease 0s;

  &:hover {
    background-color: ${themeConstants.colorWhite};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  }
`

export const AttachmentInner = styled.div`
  display: flex;
  flex-flow: column;
  margin: 10px;
  span {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: ${themeConstants.colorBlack};
  }
`
