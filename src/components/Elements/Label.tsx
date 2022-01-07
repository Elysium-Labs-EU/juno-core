import React from 'react'
import styled from 'styled-components'
import * as theme from '../../constants/themeConstants'
import { useAppSelector } from '../../Store/hooks'
import { selectStorageLabels } from '../../Store/labelsSlice'

const Wrapper = styled.div`
    background-color: ${ theme.greyBorder };
    border-color: ${ theme.greyBorder };
    display: inline-flex;
    height: 21px;
    padding: 0px 8px;
    line-height: 21px;
    border-radius: 5px;
    cursor: default;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.05em;
    outline: 0px;
    vertical-align: top;
    user-select: none;
    white-space: nowrap;
    -webkit-box-align: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    transition: background-color 0.2s ease 0s, border-color 0.2s ease 0s, color 0.2s ease 0s;`

const CustomLabel = ({ labelName }: { labelName: string }) => {
  const storageLabels = useAppSelector(selectStorageLabels)

  const convertDefaultLabels = (foundLabel: string | undefined) => {
    switch (foundLabel) {
      case 'INBOX':
        return 'Inbox'
      case 'SPAM':
        return 'Spam'
      case 'DRAFT':
        return 'Draft'
      case 'SENT':
        return 'Sent'
      default:
        return foundLabel
    }
  }

  const firstLetterCaps = labelName.charAt(0).toUpperCase() + labelName.slice(1).toLowerCase()

  return (
    <Wrapper>
      <span className="text_truncate" title={labelName}>
        {convertDefaultLabels(storageLabels.find((label) => label.id === labelName)?.name) ?? firstLetterCaps}
      </span>
    </Wrapper>)
}

export default CustomLabel