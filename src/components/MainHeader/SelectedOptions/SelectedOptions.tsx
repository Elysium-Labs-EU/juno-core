import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import { QiMeatballsH } from 'images/svgIcons/quillIcons'
import { deleteDraftBatch } from 'store/draftsSlice'
import {
  selectSelectedEmails,
  setSelectedEmails,
  updateEmailLabelBatch,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { selectAllEmailsCurrentInbox, setInSearch } from 'store/utilsSlice'

import {
  EMAILS_SELECTED_PLURAL,
  EMAILS_SELECTED_SINGLE,
  ARCHIVE_BUTTON_LABEL,
  DISCARD_BUTTON_LABEL,
  DELETE_BUTTON_LABEL,
} from './SelectedOptionsConstants'
import * as S from './SelectedOptionsStyles'

const SelectedOptions = () => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const location = useLocation()

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

  const handleDeleteAll = useCallback(() => {
    dispatch(
      updateEmailLabelBatch({
        request: { delete: true },
      })
    )
    dispatch(setSelectedEmails([]))
  }, [])

  const handleDiscardAll = useCallback(() => {
    dispatch(deleteDraftBatch())
  }, [labelIds])

  const handleShowMoreOptions = useCallback(() => {
    dispatch(setInSearch(true))
  }, [])

  if (!selectedEmails) {
    return null
  }

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
            ? EMAILS_SELECTED_PLURAL
            : EMAILS_SELECTED_SINGLE
        }`}</S.SelectedLabelsText>
        {location.pathname !== RoutesConstants.ARCHIVE &&
          (!labelIds.includes(global.DRAFT_LABEL) ? (
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
          ))}

        <CustomButton
          label={DELETE_BUTTON_LABEL}
          onClick={handleDeleteAll}
          title="Delete all the selected emails"
        />
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
