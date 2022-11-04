import { useCallback } from 'react'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import archiveMail from '../../EmailOptions/ArchiveMail'
import { selectInSearch } from '../../../store/utilsSlice'
import { setModifierKey } from '../../../utils/setModifierKey'
import { QiFolderArchive } from '../../../images/svgIcons/quillIcons'
import useKeyboardShortcut from '../../../hooks/useKeyboardShortcut'

const actionKeys = [setModifierKey, keyConstants.KEY_SPECIAL.backspace]

const ArchiveOption = ({
  iconSize,
  threadDetail,
}: {
  iconSize: number
  threadDetail: IEmailListThreadItem
}) => {
  const labelIds = useAppSelector(selectLabelIds)
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    archiveMail({
      threadId: threadDetail.id,
      labelIds,
      dispatch,
    })
  }, [threadDetail, labelIds, dispatch])

  useKeyboardShortcut({ handleEvent, actionKeys, isDisabled: inSearch })

  return (
    <CustomButton
      icon={<QiFolderArchive size={iconSize} />}
      onClick={handleEvent}
      label={local.BUTTON_ARCHIVE}
      suppressed
      title="Archive email"
    />
  )
}

export default ArchiveOption
