import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import isForwardingListener from 'components/EmailOptions/IsForwardingListener'
import * as local from 'constants/emailDetailConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiForward } from 'images/svgIcons/quillIcons'
import { selectIsReplying } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectInSearch } from 'store/utilsSlice'

import { IEmailDetailOptions } from './optionTypes'

const actionKeys = [
  keyConstants.KEY_SPECIAL.shift,
  keyConstants.KEY_SPECIAL.enter,
]

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

  useKeyboardShortcut({ handleEvent, actionKeys, isDisabled: inSearch })

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
