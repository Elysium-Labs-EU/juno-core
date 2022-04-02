import { useCallback, useEffect } from 'react'
import { FiCornerUpLeft } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import isReplyingListener from '../../EmailOptions/IsReplyingListener'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import { selectInSearch } from '../../../Store/utilsSlice'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
}

const messageIndex = 0

const ReplyOption = ({ threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    if (threadDetail.messages) {
      return isReplyingListener({
        messageIndex,
        dispatch,
      })
    }
    return null
  }, [threadDetail, messageIndex, dispatch])

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      keysPressed.includes(global.KEY_ENTER) &&
      keysPressed.includes(global.KEY_OS) &&
      !inSearch
    ) {
      handleEvent()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, inSearch])

  return (
    <CustomButton
      icon={<FiCornerUpLeft />}
      label={local.BUTTON_REPLY}
      onClick={handleEvent}
      suppressed
    />
  )
}

export default ReplyOption
