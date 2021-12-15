import styled from 'styled-components'
import * as theme from '../../constants/themeConstants'
import * as global from '../../constants/globalConstants'

interface ThreadBaseProps {
  emailLabels: string[] | null
}

export const ThreadBase = styled.div<ThreadBaseProps>`
  font-weight: ${(props) =>
    props.emailLabels && props.emailLabels.includes(global.UNREAD_LABEL)
      ? '550'
      : '400'};
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
  transition: background-color ease-in 0.125s;

  &:hover {
    background-color: ${theme.greyHover};
    z-index: 2;
    border-radius: 5px;
  }
`

export const CellCheckbox = styled.div`
  display: flex;
  place-items: center;
`

export const UnreadDot = styled.div`
  height: 5px;
  width: 5px;
  background-image: radial-gradient(
    circle at 100% -82%,
    rgb(119, 97, 245),
    rgb(118, 96, 245) 32%,
    rgb(31, 36, 238)
  );
  border-radius: 50%;
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
