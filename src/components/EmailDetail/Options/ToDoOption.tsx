import { useCallback } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import setToDoMail from '../../EmailOptions/SetToDoMail'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { selectInSearch } from '../../../store/utilsSlice'
import { setModifierKey } from '../../../utils/setModifierKey'

const actionKeys = [setModifierKey, keyConstants.KEY_E]

const ToDoOption = ({
  threadDetail,
}: {
  threadDetail: IEmailListThreadItem
}) => {
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    setToDoMail({
      messageId: threadDetail.id,
      labelIds,
      dispatch,
      storageLabels,
    })
  }, [threadDetail, labelIds, dispatch, storageLabels])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      icon={<FiCheckCircle />}
      onClick={handleEvent}
      label={local.BUTTON_TODO}
      suppressed
      title="Mark as To Do"
    />
  )
}

export default ToDoOption
