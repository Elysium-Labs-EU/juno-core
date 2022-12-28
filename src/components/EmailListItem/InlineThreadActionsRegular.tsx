import { useCallback, useMemo } from 'react'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import archiveMail from 'components/EmailOptions/ArchiveMail'
import ReplyOverview from 'components/EmailOptions/ReplyOverview'
import setToDoMail from 'components/EmailOptions/SetToDoMail'
import thrashMail from 'components/EmailOptions/ThrashMail'
import * as global from 'constants/globalConstants'
import * as themeConstants from 'constants/themeConstants'
import {
  QiFolderArchive,
  QiFolderTrash,
  QiReply,
  QiToDo,
} from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import emailLabels from 'utils/emailLabels'
import { findLabelByName } from 'utils/findLabel'

import * as S from './InlineThreadActionsStyles'

interface IInlineThreadActionsRegular {
  id: string
  email: IEmailListThreadItem
}

const ICON_SIZE = 18

/**
 * @component InlineThreadActionsRegular
 * This component is visible on the email list item - if the most recent message of the thread item is a regular message.
 * @param {object} - takes in an id (threadId) as string, and the labelIds from the relevant thread.
 * @returns regular inline thread actions, based on the labelIds and id.
 */

const InlineThreadActionsRegular = ({
  id,
  email,
}: IInlineThreadActionsRegular) => {
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  const getAllLegalMessagesLabelIds = useCallback(
    () => emailLabels(email, storageLabels),
    [email, storageLabels]
  )

  const memoizedReplyButton = useMemo(
    () => (
      <CustomIconButton
        icon={<QiReply size={ICON_SIZE} />}
        onClick={() =>
          ReplyOverview({
            id,
            dispatch,
          })
        }
        title="Reply"
        dataCy="reply-inline-button"
      />
    ),
    [id]
  )

  const memoizeMarkToDoButton = useMemo(() => {
    const staticAllMessageLabelIds = getAllLegalMessagesLabelIds()
    return (
      staticAllMessageLabelIds &&
      !staticAllMessageLabelIds.some(
        (item) =>
          item ===
          findLabelByName({
            storageLabels,
            LABEL_NAME: global.TODO_LABEL_NAME,
          })?.id
      ) && (
        <CustomIconButton
          onClick={() =>
            setToDoMail({
              threadId: id,
              labelIds: staticAllMessageLabelIds,
              dispatch,
              storageLabels,
            })
          }
          icon={<QiToDo size={ICON_SIZE} />}
          title="Mark as To Do"
          dataCy="mark-todo-inline-button"
        />
      )
    )
  }, [labelIds, id, storageLabels])

  const memoizedArchiveButton = useMemo(() => {
    const staticAllMessageLabelIds = getAllLegalMessagesLabelIds()
    return (
      staticAllMessageLabelIds.length > 0 && (
        <CustomIconButton
          onClick={() =>
            archiveMail({
              threadId: id,
              dispatch,
              labelIds: staticAllMessageLabelIds,
            })
          }
          icon={<QiFolderArchive size={ICON_SIZE} />}
          title="Archive"
          dataCy="archive-inline-button"
        />
      )
    )
  }, [id, labelIds])

  const memoizedDeleteButton = useMemo(
    () => (
      <CustomIconButton
        onClick={() => thrashMail({ threadId: id, dispatch, labelIds })}
        icon={<QiFolderTrash size={ICON_SIZE} />}
        title="Delete"
        hoverColor={themeConstants.color.red[500]}
        dataCy="delete-inline-button"
      />
    ),
    [id, labelIds]
  )

  return (
    <S.Wrapper data-testid="email-regular-inline-actions">
      {id && labelIds && (
        <S.Inner>
          {memoizedReplyButton}
          {memoizeMarkToDoButton}
          {memoizedArchiveButton}
          {memoizedDeleteButton}
        </S.Inner>
      )}
    </S.Wrapper>
  )
}

export default InlineThreadActionsRegular
