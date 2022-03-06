import { useCallback, useEffect } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import SetToDoMail from '../../EmailOptions/SetToDoMail'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'

const ToDoOption = ({
  threadDetail,
}: {
  threadDetail: IEmailListThreadItem
}) => {
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()

  const handleEvent = useCallback(() => {
    SetToDoMail({
      messageId: threadDetail.id,
      labelIds,
      dispatch,
      storageLabels,
    })
  }, [threadDetail, labelIds, dispatch, storageLabels])

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      keysPressed.includes(global.KEY_OSLEFT) &&
      keysPressed.includes(global.KEY_E)
    ) {
      handleEvent()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed])

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
