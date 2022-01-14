import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  color: #a5a5a5;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-family: 'Urbanist Variable', sans-serif;

  &:hover {
    color: #1c1c1c;
    text-decoration: none;
    font-weight: 500;
  }

  &:active {
    color: #1c1c1c;
    text-decoration: none;
    font-weight: 500;
  }

  &:disabled {
    color: #d9d9d9;
    cursor: not-allowed;
  }`

const CustomLink = (props: any) => {
    const { to, label, isActive } = props
    return (
        <Wrapper to={to} isActive={isActive}>{label}</Wrapper>
    )

}

export default CustomLink