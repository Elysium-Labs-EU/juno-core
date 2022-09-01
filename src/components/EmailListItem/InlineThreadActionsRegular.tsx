import { useCallback, useMemo } from 'react'
import { FiArchive, FiCheckCircle, FiCornerUpLeft } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import archiveMail from '../EmailOptions/ArchiveMail'
import * as S from './InlineThreadActionsStyles'
import * as todo from '../../constants/todoConstants'
import * as global from '../../constants/globalConstants'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import ReplyOverview from '../EmailOptions/ReplyOverview'
import setToDoMail from '../EmailOptions/SetToDoMail'
import { findLabelByName } from '../../utils/findLabel'
import { selectLabelIds, selectStorageLabels } from '../../store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import thrashMail from '../EmailOptions/ThrashMail'
import * as themeConstants from '../../constants/themeConstants'
import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import filterIllegalLabels from '../../utils/filterIllegalLabels'

interface IInlineThreadActionsRegular {
  id: string
  email: IEmailListThreadItem
}

const SIZE = 16

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

  // TODO: Check if this can be used elsewhere
  const getAllLegalMessagesLabelIds = useCallback(() => {
    const foundLabels: string[] = []
    email.messages.forEach((message) =>
      message.labelIds.forEach((label) => foundLabels.push(label))
    )
    return [
      ...new Set(
        filterIllegalLabels(foundLabels, storageLabels).filter(
          (label) => label !== global.SENT_LABEL && label !== global.DRAFT_LABEL
        )
      ),
    ]
  }, [email, storageLabels])

  const memoizedReplyButton = useMemo(
    () => (
      <CustomIconButton
        icon={<FiCornerUpLeft size={SIZE} />}
        onClick={() =>
          ReplyOverview({
            id,
            dispatch,
          })
        }
        title="Reply"
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
            LABEL_NAME: todo.LABEL,
          })[0]?.id
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
          icon={<FiCheckCircle size={SIZE} />}
          title="Mark as To Do"
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
          icon={<FiArchive size={SIZE} />}
          title="Archive"
        />
      )
    )
  }, [id, labelIds])

  const memoizedDeleteButton = useMemo(
    () => (
      <CustomIconButton
        onClick={() => thrashMail({ threadId: id, dispatch, labelIds })}
        icon={<AiOutlineDelete size={20} />}
        title="Delete"
        hoverColor={themeConstants.colorRed}
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
