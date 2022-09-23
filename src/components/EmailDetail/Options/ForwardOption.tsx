import { useCallback } from 'react'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import isForwardingListener from '../../EmailOptions/IsForwardingListener'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { selectInSearch } from '../../../store/utilsSlice'
import { selectIsReplying } from '../../../store/emailDetailSlice'
import { QiForward } from '../../../images/svgIcons/quillIcons'
import { IEmailDetailOptions } from './optionTypes'

const actionKeys = [keyConstants.KEY_SHIFT, keyConstants.KEY_ENTER]

const ForwardOption = ({ iconSize, threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const isReplying = useAppSelector(selectIsReplying)

  const handleEvent = useCallback(() => {
    if (threadDetail?.messages) {
      return isForwardingListener({
        dispatch,
        isReplying,
      })
    }
    return null
  }, [threadDetail, dispatch])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      icon={<QiForward size={iconSize} />}
      label={local.BUTTON_FORWARD}
      onClick={handleEvent}
      suppressed
      title="Forward email"
    />
  )
}

export default ForwardOption
