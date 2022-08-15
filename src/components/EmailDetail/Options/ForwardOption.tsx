import { useCallback } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { selectInSearch } from '../../../store/utilsSlice'
import { selectIsReplying } from '../../../store/emailDetailSlice'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
}

const messageIndex = 0
const actionKeys = [keyConstants.KEY_SHIFT, keyConstants.KEY_ENTER]

const ForwardOption = ({ threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const isReplying = useAppSelector(selectIsReplying)

  const handleEvent = useCallback(() => {
    if (threadDetail.messages) {
      return isForwardingListener({
        messageId: threadDetail.messages[threadDetail.messages.length - 1].id,
        messageIndex,
        dispatch,
        isReplying
      })
    }
    return null
  }, [threadDetail, messageIndex, dispatch])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      icon={<FiArrowRight />}
      label={local.BUTTON_FORWARD}
      onClick={handleEvent}
      suppressed
      title="Forward email"
    />
  )
}

export default ForwardOption
