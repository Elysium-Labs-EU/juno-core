import { useCallback, useMemo } from 'react'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Stack from 'components/Elements/Stack/Stack'
import StyledTooltip from 'components/Elements/StyledTooltip'
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
import emailLabels from 'utils/emailLabels'
import { findLabelByName } from 'utils/findLabel'

import * as S from './InlineThreadActionsStyles'
import type { IInlineThreadActionsRegular } from './InlineThreadActionsTypes'

const ICON_SIZE = 18

/**
 * @component InlineThreadActionsRegular
 * This component is visible on the email list item - if the most recent message of the thread item is a regular message.
 * @param {object} - takes in an id (threadId) as string, and the labelIds from the relevant thread.
 * @returns regular inline thread actions, based on the labelIds and id.
 */

const InlineThreadActionsRegular = ({
  threadId,
  email,
  emailIndex,
  isFocused,
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
      <StyledTooltip title="Reply">
        <CustomIconButton
          icon={<QiReply size={ICON_SIZE} />}
          onClick={() =>
            ReplyOverview({
              id: threadId,
              emailIndex,
              dispatch,
            })
          }
          title="Reply"
          dataCy="reply-inline-button"
        />
      </StyledTooltip>
    ),
    [emailIndex, threadId]
  )

  // TODO: Do not enable right now. This takes more time to implement, due to the loading of the email detail only on email detail mount.
  // const memoizedForwardButton = useMemo(
  //   () => (
  //     <StyledTooltip title="Forward">
  //       <CustomIconButton
  //         icon={<QiForward size={ICON_SIZE} />}
  //         onClick={() =>
  //           ForwardOverview({
  //             id: threadId,
  //             emailIndex,
  //             dispatch,
  //           })
  //         }
  //         title="Forward"
  //         dataCy="forward-inline-button"
  //       />
  //     </StyledTooltip>
  //   ),
  //   [emailIndex, threadId]
  // )

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
        <StyledTooltip title="Mark as To Do">
          <CustomIconButton
            onClick={() =>
              setToDoMail({
                threadId,
                labelIds: staticAllMessageLabelIds,
                dispatch,
                storageLabels,
              })
            }
            icon={<QiToDo size={ICON_SIZE} />}
            title="Mark as To Do"
            dataCy="mark-todo-inline-button"
          />
        </StyledTooltip>
      )
    )
  }, [labelIds, threadId, storageLabels])

  const memoizedArchiveButton = useMemo(() => {
    const staticAllMessageLabelIds = getAllLegalMessagesLabelIds()
    return (
      staticAllMessageLabelIds.length > 0 && (
        <StyledTooltip title="Archive">
          <CustomIconButton
            onClick={() =>
              archiveMail({
                threadId,
                dispatch,
                labelIds: staticAllMessageLabelIds,
              })
            }
            icon={<QiFolderArchive size={ICON_SIZE} />}
            title="Archive"
            dataCy="archive-inline-button"
          />
        </StyledTooltip>
      )
    )
  }, [threadId, labelIds])

  const memoizedDeleteButton = useMemo(() => {
    const staticAllMessageLabelIds = getAllLegalMessagesLabelIds()
    if (staticAllMessageLabelIds.includes(global.TRASH_LABEL)) {
      return null
    }
    return (
      <StyledTooltip title="Delete">
        <CustomIconButton
          onClick={() => thrashMail({ threadId, dispatch, labelIds })}
          icon={<QiFolderTrash size={ICON_SIZE} />}
          title="Delete"
          hoverColor={themeConstants.color.red[600]}
          dataCy="delete-inline-button"
        />
      </StyledTooltip>
    )
  }, [threadId, labelIds])

  return (
    <S.Wrapper data-testid="email-regular-inline-actions" isFocused={isFocused}>
      {threadId && labelIds && (
        <Stack spacing="large">
          {memoizedReplyButton}
          {/* {memoizedForwardButton} */}
          {memoizeMarkToDoButton}
          {memoizedArchiveButton}
          {memoizedDeleteButton}
        </Stack>
      )}
    </S.Wrapper>
  )
}

export default InlineThreadActionsRegular
