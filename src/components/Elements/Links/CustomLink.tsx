import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface ICustomLink {
  to: string
  label: string
}

const Wrapper = styled(Link)`
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: left;
  color: var(--color-grey);
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-family);

  &:hover,
  &:active {
    color: var(--color-black);
    text-decoration: none;
    font-weight: 500;
  }

  &:disabled {
    color: var(--color-grey-ultra-light);
    cursor: not-allowed;
  }
`

const CustomLink = ({ to, label }: ICustomLink) => (
  <Wrapper to={to}>{label}</Wrapper>
)

export default CustomLink
