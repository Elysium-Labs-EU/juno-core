import { useCallback } from 'react'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import isReplyingListener from '../../EmailOptions/IsReplyingListener'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectInSearch } from '../../../store/utilsSlice'
import { setModifierKey } from '../../../utils/setModifierKey'
import { selectIsForwarding } from '../../../store/emailDetailSlice'
import { QiReply } from '../../../images/svgIcons/quillIcons'
import { IEmailDetailOptions } from './optionTypes'
import useKeyboardShortcut from '../../../hooks/useKeyboardShortcut'

const actionKeys = [setModifierKey, keyConstants.KEY_SPECIAL.enter]

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

  useKeyboardShortcut({ handleEvent, actionKeys, isDisabled: inSearch })

  return (
    <CustomButton
      icon={<QiReply size={iconSize} />}
      label={local.BUTTON_REPLY}
      onClick={handleEvent}
      suppressed
      title="Reply email"
    />
  )
}

export default ReplyOption
