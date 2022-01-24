import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import * as local from '../../../constants/emailDetailConstants'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import filterIllegalLabels from '../../../utils/filterIllegalLabels'
import CustomButton from '../../Elements/Buttons/CustomButton'
import thrashMail from '../../EmailOptions/ThrashMail'

interface IDeleteOption {
  messageId: string
  icon?: {}
  suppressed?: boolean
}

const DeleteOption = ({ messageId, icon, suppressed }: IDeleteOption) => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)

  return (
    <CustomButton
      onClick={() =>
        thrashMail({
          messageId,
          labelIds: onlyLegalLabels,
          dispatch,
        })
      }
      label={local.BUTTON_DELETE}
      icon={icon}
      suppressed={suppressed}
    />
  )
}

export default DeleteOption

DeleteOption.defaultProps = {
  icon: null,
  suppressed: false,
}
