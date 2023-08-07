import { useCallback, useMemo, useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import getEmailSubject from 'components/Elements/EmailSubject'
import getSenderNameFull from 'components/Elements/SenderName/getSenderNameFull'
import getSenderNamePartial from 'components/Elements/SenderName/getSenderNamePartial'
import * as S from 'components/EmailDetail/EmailDetailStyles'
import discardDraft from 'components/EmailOptions/DiscardDraft'
import * as local from 'constants/draftConstants'
import { QiFolderTrash } from 'images/svgIcons/quillIcons'
import { selectProfile } from 'store/baseSlice'
import { selectDraftList } from 'store/draftsSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import { Paragraph } from 'styles/globalStyles'
import findDraftMessageInList from 'utils/findDraftMessageInList'

import ClosedMessageLayout from './Layouts/ClosedMessageLayout'
import OpenMessageLayout from './Layouts/OpenMessageLayout'

interface DraftMessageProps {
  message: TThreadObject['messages'][0]
  draftIndex: number
  handleClickListener: ({
    id,
    messageId,
    dIndex,
  }: {
    id: string
    messageId: string
    dIndex: number
  }) => void
  hideDraft: boolean
}

const DraftMessage = ({
  message,
  draftIndex,
  handleClickListener,
  hideDraft,
}: DraftMessageProps) => {
  const [open, setOpen] = useState<boolean>(true)
  const { emailAddress } = useAppSelector(selectProfile)
  const draftList = useAppSelector(selectDraftList)
  const dispatch = useAppDispatch()

  const emailSnippet = `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}...`

  const staticSenderNameFull = useMemo(
    () => getSenderNameFull(message.payload.headers.from, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => getSenderNamePartial(message.payload.headers.from, emailAddress),
    []
  )

  const staticEmailSubject = useMemo(
    () => getEmailSubject(message.payload.headers.subject),
    []
  )

  // Send back detail to the parent component to hide the draft from the list and open the composer
  const handleEditLocal = useCallback(() => {
    const foundDraft = findDraftMessageInList({ draftList, target: message })
    if (foundDraft) {
      handleClickListener({
        dIndex: draftIndex,
        id: foundDraft.message.id,
        messageId: foundDraft.message.id,
      })
    }
  }, [draftList, message])

  const handleOpenClose = () => {
    setOpen((currState) => !currState)
  }

  const handleDiscardDraft = useCallback(() => {
    const foundDraft = findDraftMessageInList({ draftList, target: message })
    if (foundDraft) {
      discardDraft({
        dispatch,
        draftId: foundDraft.id,
        messageId: foundDraft.message.id,
        threadId: foundDraft.message.threadId,
      })
    }
  }, [draftList, message])

  return !open ? (
    <ClosedMessageLayout
      emailSnippet={emailSnippet}
      handleClick={handleOpenClose}
      isDraft
      message={message}
      senderNameFull={staticSenderNameFull}
      senderNamePartial={staticSenderNamePartial}
    />
  ) : (
    <OpenMessageLayout
      draftHeaderControls={
        <S.DraftHeaderControls>
          <Paragraph muted small style={{ marginRight: 'var(--spacing-4)' }}>
            {local.DRAFT_INDICATOR_HEADER}
          </Paragraph>
          <CustomButton
            style={{ marginRight: '10px' }}
            label="Edit"
            title="Edit the draft"
            icon={<FiEdit />}
            suppressed
            onClick={handleEditLocal}
          />
          <CustomButton
            label="Discard"
            title="Discard the draft"
            icon={<QiFolderTrash />}
            suppressed
            onClick={handleDiscardDraft}
          />
        </S.DraftHeaderControls>
      }
      emailSubject={staticEmailSubject}
      handleClick={handleOpenClose}
      hideMessage={hideDraft}
      isDraft
      message={message}
      senderNameFull={staticSenderNameFull}
      senderNamePartial={staticSenderNamePartial}
    />
  )
}

export default DraftMessage
