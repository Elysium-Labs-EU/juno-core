import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import archiveMail from '../../EmailOptions/ArchiveMail'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { selectInSearch } from '../../../store/utilsSlice'
import { setModifierKey } from '../../../utils/setModifierKey'
import { QiFolderArchive } from '../../../images/svgIcons/quillIcons'

const actionKeys = [setModifierKey, keyConstants.KEY_BACKSPACE]

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
  const location = useLocation()

  const handleEvent = useCallback(() => {
    archiveMail({
      threadId: threadDetail.id,
      labelIds,
      dispatch,
      location,
    })
  }, [threadDetail, labelIds, dispatch])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

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
