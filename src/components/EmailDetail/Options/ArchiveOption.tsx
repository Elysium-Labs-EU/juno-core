import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import archiveMail from 'components/EmailOptions/ArchiveMail'
import * as local from 'constants/emailDetailConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiFolderArchive } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import { selectInSearch } from 'store/utilsSlice'
import { setModifierKey } from 'utils/setModifierKey'

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

  useKeyboardShortcut({
    handleEvent,
    modifierKey: setModifierKey,
    key: keyConstants.KEY_SPECIAL.backspace,
    isDisabled: inSearch,
  })

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
