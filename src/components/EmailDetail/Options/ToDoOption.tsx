import { FiCheckCircle } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import SetToDoMail from '../../EmailOptions/SetToDoMail'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'

const ToDoOption = ({
  threadDetail,
}: {
  threadDetail: IEmailListThreadItem
}) => {
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  return (
    <CustomButton
      icon={<FiCheckCircle />}
      onClick={() =>
        SetToDoMail({
          messageId: threadDetail.id,
          labelIds,
          dispatch,
          storageLabels,
        })
      }
      label={local.BUTTON_TODO}
      suppressed
    />
  )
}

export default ToDoOption
