import { useCallback, useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import { useAppDispatch } from '../../../Store/hooks'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
}

const messageIndex = 0

const ForwardOption = ({ threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()

  const handleEvent = useCallback(() => {
    if (threadDetail.messages) {
      return isForwardingListener({
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
      keysPressed.includes(global.KEY_SHIFT) &&
      keysPressed.includes(global.KEY_ENTER)
    ) {
      handleEvent()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed])

  return (
    <CustomButton
      icon={<FiArrowRight />}
      label={local.BUTTON_FORWARD}
      onClick={handleEvent}
      suppressed
    />
  )
}

export default ForwardOption
