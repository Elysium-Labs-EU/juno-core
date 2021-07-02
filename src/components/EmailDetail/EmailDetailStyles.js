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

export const EmailOptionsContainer = styled.div`
  position: relative;
  padding: 30px;
`
export const StickyOptions = styled.div`
  position: sticky;
  top: 122px;
`

export const InnerOptionsContainer = styled.div`
  width: 110px;
`
