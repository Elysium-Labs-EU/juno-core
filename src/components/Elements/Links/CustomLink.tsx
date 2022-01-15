import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as themeConstants from '../../../constants/themeConstants'

interface IWrapper {
  isActive: boolean | undefined
}

const Wrapper = styled(Link) <IWrapper>`  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: left;
  color: ${ themeConstants.colorGrey };
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Urbanist Variable', sans-serif;

  &:hover {
    color: ${ themeConstants.colorBlack };
    text-decoration: none;
    font-weight: 500;
  }

  &:active {
    color: ${ themeConstants.colorBlack };
    text-decoration: none;
    font-weight: 500;
  }

  &:disabled {
    color: ${ themeConstants.colorUltraLightGrey };
    cursor: not-allowed;
  }`

const CustomLink = (props: any) => {
  const { to, label, isActive } = props
  return (
    <Wrapper to={to} isActive={isActive}>{label}</Wrapper>
  )

}

export default CustomLink