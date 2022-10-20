import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import setToDoMail from '../../EmailOptions/SetToDoMail'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { selectInSearch } from '../../../store/utilsSlice'
import { setModifierKey } from '../../../utils/setModifierKey'
import { QiToDo } from '../../../images/svgIcons/quillIcons'
import { IEmailDetailOptions } from './optionTypes'

const actionKeys = [setModifierKey, keyConstants.keyConstants.KEY_LETTERS.E]

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

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      icon={<QiToDo size={iconSize} />}
      onClick={handleEvent}
      label={local.BUTTON_TODO}
      suppressed
      title="Mark as To Do"
    />
  )
}

export default ToDoOption
