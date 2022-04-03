import { useCallback } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import SetToDoMail from '../../EmailOptions/SetToDoMail'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import { selectInSearch } from '../../../Store/utilsSlice'

const actionKeys = [global.KEY_OS, global.KEY_E]

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
    SetToDoMail({
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
    />
  )
}

export default ToDoOption
