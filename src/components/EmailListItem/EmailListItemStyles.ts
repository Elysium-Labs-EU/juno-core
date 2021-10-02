import styled from 'styled-components'

interface ThreadBaseProps {
  emailLabels: string[] | null
}

export const ThreadBase = styled.div<ThreadBaseProps>`
  font-weight: ${(props) =>
    props.emailLabels && props.emailLabels.includes('UNREAD')
      ? '600'
      : 'regular'};
  position: relative;
  user-select: none;
  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`

export const ThreadRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 30px 20px 215px auto max-content 105px 20px 30px;
  font-size: 13px;
  height: 56px;
  background-color: transparent;
  transition: background-color ease-in 0.3s;

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
