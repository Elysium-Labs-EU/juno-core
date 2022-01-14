import React from 'react'
import styled from 'styled-components'
import * as theme from '../../constants/themeConstants'

const Wrapper = styled.div`
    background-color: ${ theme.colorGreyBorder };
    border-color: ${ theme.colorGreyBorder };
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

const CustomLabel = ({ labelName }: { labelName: string }) => (
    <Wrapper>
        <span className="text_truncate" title={labelName}>
            {labelName}
        </span>
    </Wrapper>)

export default CustomLabel