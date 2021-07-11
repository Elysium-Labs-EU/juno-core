import styled from 'styled-components'

export const ThreadBase = styled.div`
  font-weight: ${(props) =>
    props.emailLabels && props.emailLabels.includes('UNREAD')
      ? '600'
      : 'regular'};
  position: relative;
  user-select: none;
  --line-margin: 30px;
  --padding-left: 30px;
  --padding-right: 30px;
  --primary-text: #535358;
  --mindful-text: #8e8e99;
  --discreet-text: #aeaeb4;
  color: #535358;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const ThreadRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: var(--padding-left) 20px 215px auto max-content 105px 20px var(
      --padding-right
    );
  font-size: 13px;
  height: 56px;

  &:hover {
    background-color: #f7f7f7;
    z-index: 2;
  }
`

export const Avatars = styled.div`
  margin-right: 15px;
`

export const CellName = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  user-select: none;
  color: var(--primary-text);
`

export const CellMessage = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  min-width: 0;
  padding-left: 15px;
  white-space: nowrap;
`

export const CellAttachment = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  justify-self: end;
  padding-left: 10px;
`

export const CellDate = styled.div`
  text-align: right;
`

export const DatePosition = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
`
