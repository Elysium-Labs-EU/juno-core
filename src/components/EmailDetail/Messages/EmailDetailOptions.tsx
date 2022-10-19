import { useMemo } from 'react'

import * as global from '../../../constants/globalConstants'
import { QiFolderTrash } from '../../../images/svgIcons/quillIcons'
import {
  selectCoreStatus,
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { selectStorageLabels } from '../../../store/labelsSlice'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import { selectAlternateActions } from '../../../store/utilsSlice'
import emailLabels from '../../../utils/emailLabels'
import { findLabelByName } from '../../../utils/findLabel'
import * as S from '../EmailDetailStyles'
import ArchiveOption from '../Options/ArchiveOption'
import DeleteOption from '../Options/DeleteOption'
import ForwardOption from '../Options/ForwardOption'
import ReplyOption from '../Options/ReplyOption'
import SkipOption from '../Options/SkipOption'
import ToDoOption from '../Options/ToDoOption'
import UnsubscribeOption from '../Options/UnsubscribeOption'
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

  const memoizedToDoOption = useMemo(
    () =>
      staticEmailLabels &&
      !staticEmailLabels.some(
        (item) =>
          item ===
          findLabelByName({
            storageLabels,
            LABEL_NAME: global.TODO_LABEL_NAME,
          })?.id
      ) && <ToDoOption threadDetail={threadDetail} iconSize={ICON_SIZE} />,
    [threadDetail, staticEmailLabels]
  )

  return (
    <S.EmailOptionsContainer tabbedView={isReplying || isForwarding}>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          {memoizedReplyOption}
          {memoizedForwardOption}
          {memoizedToDoOption}
          {staticEmailLabels.length > 0 ? (
            <EmailDetailOptionStacker
              firstOption={
                <ArchiveOption
                  threadDetail={threadDetail}
                  iconSize={ICON_SIZE}
                />
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
          )}
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
