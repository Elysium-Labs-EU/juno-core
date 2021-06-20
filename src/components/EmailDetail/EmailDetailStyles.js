import styled from 'styled-components'

export const EmailWrapper = styled.div`
  border-radius: 6px;
  background-color: ${(props) =>
    props.labelIds.includes('DRAFT') ? '#d971ff0f' : '#ffff'};
  margin-bottom: 0.5rem;
  padding: 1rem;
`

export const EmailDetailContainer = styled.div`
  /* border-radius: 6px;
  background-color: #ffff;
  margin-bottom: 0.5rem;
  padding: 1rem; */
  /* background-color: #d971ff0f; */
`
