import styled from 'styled-components'

export const ThreadBase = styled.div`
  font-weight: ${(props) => (props.labelIds === 'UNREAD' ? '500' : 'regular')};
  position: relative;
  user-select: none;
  --line-margin: 30px;
  --padding-left: 30px;
  --padding-right: 30px;
  --primary-text: #535358;
  --mindful-text: #8e8e99;
  --discreet-text: #aeaeb4;
  color: #535358;

  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`
