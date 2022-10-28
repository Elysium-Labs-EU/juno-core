import { useCallback } from 'react'
import {
  selectSelectedEmails,
  setSelectedEmails,
  updateEmailLabelBatch,
} from '../../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLabelIds } from '../../../store/labelsSlice'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as S from './SelectedOptionsStyles'
import * as global from '../../../constants/globalConstants'
import { deleteDraftBatch } from '../../../store/draftsSlice'
import {
  selectAllEmailsCurrentInbox,
  setInSearch,
} from '../../../store/utilsSlice'
import { QiMeatballsH } from '../../../images/svgIcons/quillIcons'

const ARCHIVE_BUTTON_LABEL = 'Archive'
const DISCARD_BUTTON_LABEL = 'Discard'
const EMAILS_SELECTED_SINGLE = 'emails selected'
const EMAILS_SELECTED_PLURAL = 'email selected'

const SelectedOptions = () => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)

  const handleCancel = useCallback(() => {
    dispatch(setSelectedEmails([]))
  }, [])

  const handleSelectAll = useCallback(() => {
    dispatch(selectAllEmailsCurrentInbox())
  }, [])

  const handleArchiveAll = useCallback(() => {
    const request = {
      removeLabelIds: [
        ...labelIds.filter((item) => item !== global.UNREAD_LABEL),
      ],
    }

    dispatch(updateEmailLabelBatch({ request }))
    dispatch(setSelectedEmails([]))
  }, [labelIds])

  const handleDiscardAll = useCallback(() => {
    dispatch(deleteDraftBatch())
  }, [labelIds])

  const handleShowMoreOptions = useCallback(() => {
    dispatch(setInSearch(true))
  }, [])

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomButton
          label="Cancel"
          onClick={handleCancel}
          title="Cancel the selection"
        />
        <CustomButton
          label="Select all"
          onClick={handleSelectAll}
          title="Select all the emails in current view"
        />
      </S.Inner>
      <S.Inner>
        <S.SelectedLabelsText>{`${selectedEmails.selectedIds.length} ${
          selectedEmails.selectedIds.length > 1
            ? EMAILS_SELECTED_SINGLE
            : EMAILS_SELECTED_PLURAL
        }`}</S.SelectedLabelsText>
        {!labelIds.includes(global.DRAFT_LABEL) ? (
          <CustomButton
            label={ARCHIVE_BUTTON_LABEL}
            onClick={handleArchiveAll}
            title="Archive all the selected emails"
          />
        ) : (
          <CustomButton
            label={DISCARD_BUTTON_LABEL}
            onClick={handleDiscardAll}
            title="Discard all the selected drafts"
          />
        )}
        <CustomButton
          label=""
          onClick={handleShowMoreOptions}
          title="Show more options to use with selected emails"
          icon={<QiMeatballsH />}
          showIconAfterLabel
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default SelectedOptions
