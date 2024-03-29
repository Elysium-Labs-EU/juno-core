import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import setToDoMail from 'components/EmailOptions/SetToDoMail'
import * as local from 'constants/emailDetailConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiToDo } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import { selectInSearch } from 'store/utilsSlice'
import { setModifierKey } from 'utils/setModifierKey'

import type { IEmailDetailOptions } from './optionTypes'

const ToDoOption = ({ iconSize, threadDetail }: IEmailDetailOptions) => {
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    setToDoMail({
      threadId: threadDetail.id,
      labelIds,
      dispatch,
      storageLabels,
    })
  }, [threadDetail, labelIds, dispatch, storageLabels])

  useKeyboardShortcut({
    handleEvent,
    key: keyConstants.KEY_LETTERS.e,
    modifierKey: setModifierKey,
    isDisabled: inSearch,
  })

  return (
    <CustomButton
      icon={<QiToDo size={iconSize} />}
      onClick={handleEvent}
      label={local.BUTTON_TODO}
      suppressed
      title="Mark as To Do"
      dataCy="todo-button"
    />
  )
}

export default ToDoOption
