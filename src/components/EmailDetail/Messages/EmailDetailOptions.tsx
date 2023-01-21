import { useMemo } from 'react'

import * as S from 'components/EmailDetail/EmailDetailStyles'
import ArchiveOption from 'components/EmailDetail/Options/ArchiveOption'
import DeleteOption from 'components/EmailDetail/Options/DeleteOption'
import ForwardOption from 'components/EmailDetail/Options/ForwardOption'
import ReplyOption from 'components/EmailDetail/Options/ReplyOption'
import SkipOption from 'components/EmailDetail/Options/SkipOption'
import ToDoOption from 'components/EmailDetail/Options/ToDoOption'
import UnsubscribeOption from 'components/EmailDetail/Options/UnsubscribeOption'
import * as global from 'constants/globalConstants'
import { QiFolderTrash } from 'images/svgIcons/quillIcons'
import {
  selectCoreStatus,
  selectIsForwarding,
  selectIsReplying,
} from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectStorageLabels } from 'store/labelsSlice'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import { selectAlternateActions } from 'store/utilsSlice'
import emailLabels from 'utils/emailLabels'
import { findLabelByName } from 'utils/findLabel'
import { onlyLegalLabelStrings } from 'utils/onlyLegalLabels'

import EmailDetailOptionStacker from './EmailDetailOptionsStacker/EmailDetailOptionStacker'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
  unsubscribeLink: string | null
}

const ICON_SIZE = 16

const EmailDetailOptions = ({
  threadDetail,
  unsubscribeLink,
}: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()
  const coreStatus = useAppSelector(selectCoreStatus)
  const storageLabels = useAppSelector(selectStorageLabels)
  const alternateActions = useAppSelector(selectAlternateActions)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)

  const staticEmailLabels = emailLabels(threadDetail, storageLabels)

  const memoizedReplyOption = useMemo(
    () => <ReplyOption threadDetail={threadDetail} iconSize={ICON_SIZE} />,
    [threadDetail]
  )
  const memoizedForwardOption = useMemo(
    () => <ForwardOption threadDetail={threadDetail} iconSize={ICON_SIZE} />,
    [threadDetail]
  )

  const memoizedToDoOption = useMemo(() => {
    const lastMessageLabels =
      threadDetail.messages[threadDetail.messages.length - 1]?.labelIds
    if (lastMessageLabels) {
      const getOnlyLegalLabels = onlyLegalLabelStrings({
        labelIds: lastMessageLabels,
        storageLabels,
      }).filter(
        (label) => label !== global.SENT_LABEL && label !== global.DRAFT_LABEL
      )
      if (
        getOnlyLegalLabels &&
        !getOnlyLegalLabels.some(
          (item) =>
            item ===
            findLabelByName({
              storageLabels,
              LABEL_NAME: global.TODO_LABEL_NAME,
            })?.id
        )
      ) {
        return <ToDoOption threadDetail={threadDetail} iconSize={ICON_SIZE} />
      }
      return null
    }
    return null
  }, [threadDetail, storageLabels])

  const memoizedTrashArchiveOption = useMemo(() => {
    const lastMessageLabels =
      threadDetail.messages[threadDetail.messages.length - 1]?.labelIds
    if (lastMessageLabels?.includes(global.TRASH_LABEL)) {
      return null
    }
    return staticEmailLabels.length > 0 ? (
      <EmailDetailOptionStacker
        firstOption={
          <ArchiveOption threadDetail={threadDetail} iconSize={ICON_SIZE} />
        }
        secondOption={
          <DeleteOption
            threadId={threadDetail.id}
            icon={<QiFolderTrash size={ICON_SIZE} />}
            suppressed
            noArchive
          />
        }
        prioritizeSecondOption={alternateActions}
      />
    ) : (
      <DeleteOption
        threadId={threadDetail.id}
        icon={<QiFolderTrash size={ICON_SIZE} />}
        suppressed
        noArchive
      />
    )
  }, [threadDetail, storageLabels])

  return (
    <S.EmailOptionsContainer tabbedView={isReplying || isForwarding}>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          {memoizedReplyOption}
          {memoizedForwardOption}
          {memoizedToDoOption}
          {memoizedTrashArchiveOption}
          {(coreStatus === global.CORE_STATUS_MAP.focused ||
            coreStatus === global.CORE_STATUS_MAP.sorting) && (
            <SkipOption iconSize={ICON_SIZE} />
          )}
          {unsubscribeLink && (
            <>
              <S.Spacer />
              <UnsubscribeOption
                dispatch={dispatch}
                unsubscribeLink={unsubscribeLink}
                iconSize={ICON_SIZE}
              />
            </>
          )}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetailOptions
