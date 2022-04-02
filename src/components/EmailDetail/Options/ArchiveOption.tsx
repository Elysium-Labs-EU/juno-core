import { useCallback, useEffect } from 'react'
import { FiArchive } from 'react-icons/fi'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { selectLabelIds } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import CustomButton from '../../Elements/Buttons/CustomButton'
import archiveMail from '../../EmailOptions/ArchiveMail'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import { selectInSearch } from '../../../Store/utilsSlice'

const ArchiveOption = ({
  threadDetail,
}: {
  threadDetail: IEmailListThreadItem
}) => {
  const labelIds = useAppSelector(selectLabelIds)
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    archiveMail({
      messageId: threadDetail.id,
      labelIds,
      dispatch,
    })
  }, [threadDetail, labelIds, dispatch])

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      keysPressed.includes(global.KEY_OS) &&
      keysPressed.includes(global.KEY_BACKSPACE) &&
      !inSearch
    ) {
      handleEvent()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, inSearch])

  return (
    <CustomButton
      icon={<FiArchive />}
      onClick={handleEvent}
      label={local.BUTTON_ARCHIVE}
      suppressed
    />
  )
}

export default ArchiveOption
