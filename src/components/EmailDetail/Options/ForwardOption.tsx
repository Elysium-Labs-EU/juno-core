import { useCallback } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import useKeyCombo from '../../../Hooks/useKeyCombo'
import { selectInSearch } from '../../../Store/utilsSlice'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
}

const messageIndex = 0
const actionKeys = [global.KEY_SHIFT, global.KEY_ENTER]

const ForwardOption = ({ threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    if (threadDetail.messages) {
      return isForwardingListener({
        messageIndex,
        dispatch,
      })
    }
    return null
  }, [threadDetail, messageIndex, dispatch])

  useKeyCombo({ handleEvent, keysPressed, actionKeys, inSearch })

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
