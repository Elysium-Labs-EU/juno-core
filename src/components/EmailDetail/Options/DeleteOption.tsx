import { useCallback } from 'react'

import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import useKeyboardShortcut from '../../../hooks/useKeyboardShortcut'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds, selectStorageLabels } from '../../../store/labelsSlice'
import { selectInSearch } from '../../../store/utilsSlice'
import { onlyLegalLabelStrings } from '../../../utils/onlyLegalLabels'
import { setModifierKey } from '../../../utils/setModifierKey'
import CustomButton from '../../Elements/Buttons/CustomButton'
import thrashMail from '../../EmailOptions/ThrashMail'

interface IDeleteOption {
  threadId: string
  icon?: JSX.Element
  suppressed?: boolean
  noArchive?: boolean
}

const actionKeys = [setModifierKey, keyConstants.KEY_SPECIAL.backspace]

const DeleteOption = ({
  threadId,
  icon = undefined,
  suppressed = false,
  noArchive = false,
}: IDeleteOption) => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const onlyLegalLabels = onlyLegalLabelStrings({ labelIds, storageLabels })
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    thrashMail({
      threadId,
      labelIds: onlyLegalLabels,
      dispatch,
    })
  }, [onlyLegalLabels, labelIds, dispatch])

  noArchive &&
    useKeyboardShortcut({ handleEvent, actionKeys, isDisabled: inSearch })

  return (
    <CustomButton
      onClick={handleEvent}
      label={local.BUTTON_DELETE}
      icon={icon}
      suppressed={suppressed}
      title="Delete email"
    />
  )
}

export default DeleteOption
