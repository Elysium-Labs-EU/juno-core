import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmailMoreOptions from '../MoreOptions/EmailMoreOptions'
import { findLabelByName } from '../../../utils/findLabel'
import { selectLabelIds, selectStorageLabels } from '../../../store/labelsSlice'
import * as global from '../../../constants/globalConstants'
import * as S from '../EmailDetailStyles'
import { useAppSelector } from '../../../store/hooks'
import emailLabels from '../../../utils/emailLabels'
import DeleteOption from '../Options/DeleteOption'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import ReplyOption from '../Options/ReplyOption'
import ToDoOption from '../Options/ToDoOption'
import ArchiveOption from '../Options/ArchiveOption'
import MoreOption from '../Options/MoreOption'
import {
  selectCoreStatus,
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import SkipOption from '../Options/SkipOption'
import ForwardOption from '../Options/ForwardOption'
import UnsubscribeOption from '../Options/UnsubscribeOption'
import useClickOutside from '../../../hooks/useClickOutside'
import { QiFolderTrash } from '../../../images/svgIcons/quillIcons'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
  unsubscribeLink: string | null
}

const ICON_SIZE = 16

const EmailDetailOptions = ({
  threadDetail,
  unsubscribeLink,
}: IEmailDetailOptions) => {
  const labelIds = useAppSelector(selectLabelIds)
  const coreStatus = useAppSelector(selectCoreStatus)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const location = useLocation()

  const { ref } = useClickOutside({
    onClickOutside: () => setShowMenu(false),
  })

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false)
    }
  }, [location])

  const staticEmailLabels = emailLabels(threadDetail, storageLabels)

  const memoizedReplyOption = useMemo(
    () => <ReplyOption threadDetail={threadDetail} iconSize={ICON_SIZE} />,
    [threadDetail]
  )
  const memoizedForwardOption = useMemo(
    () => <ForwardOption threadDetail={threadDetail} iconSize={ICON_SIZE} />,
    [threadDetail]
  )

  return (
    <S.EmailOptionsContainer tabbedView={isReplying || isForwarding}>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          {memoizedReplyOption}
          {memoizedForwardOption}
          {labelIds &&
            !labelIds.some(
              (item) =>
                item ===
                findLabelByName({
                  storageLabels,
                  LABEL_NAME: global.TODO_LABEL_NAME,
                })?.id
            ) && (
              <ToDoOption threadDetail={threadDetail} iconSize={ICON_SIZE} />
            )}
          {staticEmailLabels.length > 0 && (
            <ArchiveOption threadDetail={threadDetail} iconSize={ICON_SIZE} />
          )}
          {(coreStatus === global.CORE_STATUS_FOCUSED ||
            coreStatus === global.CORE_STATUS_SORTING) && (
            <SkipOption iconSize={ICON_SIZE} />
          )}
          {staticEmailLabels.length > 0 && (
            <MoreOption
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              iconSize={ICON_SIZE}
            />
          )}
          {staticEmailLabels.length === 0 && (
            <DeleteOption
              threadId={threadDetail.id}
              icon={<QiFolderTrash size={ICON_SIZE} />}
              suppressed
              noArchive
            />
          )}
          {showMenu && (
            <EmailMoreOptions ref={ref} threadId={threadDetail.id} />
          )}
          {unsubscribeLink && (
            <>
              <S.Spacer />
              <UnsubscribeOption
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
