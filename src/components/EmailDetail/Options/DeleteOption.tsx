import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { selectLabelIds, selectStorageLabels } from '../../../store/labelsSlice'
import filterIllegalLabels from '../../../utils/filterIllegalLabels'
import CustomButton from '../../Elements/Buttons/CustomButton'
import thrashMail from '../../EmailOptions/ThrashMail'
import modifierKey from '../../../utils/setModifierKey'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { selectInSearch } from '../../../store/utilsSlice'

interface IDeleteOption {
  messageId: string
  icon?: JSX.Element
  suppressed?: boolean
  noArchive?: boolean
}

const actionKeys = [modifierKey, global.KEY_BACKSPACE]

const DeleteOption = ({
  messageId,
  icon,
  suppressed,
  noArchive,
}: IDeleteOption) => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const onlyLegalLabels = filterIllegalLabels(labelIds, storageLabels)
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    thrashMail({
      messageId,
      labelIds: onlyLegalLabels,
      dispatch,
    })
  }, [onlyLegalLabels, labelIds, dispatch])

  noArchive && useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      onClick={handleEvent}
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
  noArchive: false,
}
