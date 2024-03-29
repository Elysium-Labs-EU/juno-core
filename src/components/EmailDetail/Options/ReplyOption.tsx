import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import isReplyingListener from 'components/EmailOptions/IsReplyingListener'
import * as local from 'constants/emailDetailConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiReply } from 'images/svgIcons/quillIcons'
import { selectIsForwarding } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectInSearch } from 'store/utilsSlice'
import { setModifierKey } from 'utils/setModifierKey'

import type { IEmailDetailOptions } from './optionTypes'

const ReplyOption = ({ iconSize, threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)
  const isForwarding = useAppSelector(selectIsForwarding)

  const handleEvent = useCallback(() => {
    if (threadDetail?.messages) {
      return isReplyingListener({
        dispatch,
        isForwarding,
      })
    }
    return null
  }, [threadDetail, dispatch])

  useKeyboardShortcut({
    handleEvent,
    key: keyConstants.KEY_SPECIAL.enter,
    modifierKey: setModifierKey,
    isDisabled: inSearch,
  })

  return (
    <CustomButton
      icon={<QiReply size={iconSize} />}
      label={local.BUTTON_REPLY}
      onClick={handleEvent}
      suppressed
      title="Reply email"
      dataCy="reply-button"
    />
  )
}

export default ReplyOption
