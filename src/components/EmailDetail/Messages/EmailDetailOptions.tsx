import { useEffect, useState } from 'react'
import { FiDelete } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import EmailMoreOptions from '../MoreOptions/EmailMoreOptions'
import { findLabelByName } from '../../../utils/findLabel'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as todo from '../../../constants/todoConstants'
import * as global from '../../../constants/globalConstants'
import * as S from '../EmailDetailStyles'
import { useAppSelector } from '../../../Store/hooks'
import emailLabels from '../../../utils/emailLabels'
import DeleteOption from '../Options/DeleteOption'
import onlyLegalLabelObjects from '../../../utils/onlyLegalLabelObjects'
import { IEmailListThreadItem } from '../../../Store/storeTypes/emailListTypes'
import ReplyOption from '../Options/ReplyOption'
import ToDoOption from '../Options/ToDoOption'
import ArchiveOption from '../Options/ArchiveOption'
import MoreOption from '../Options/MoreOption'
import {
  selectCoreStatus,
  selectIsForwarding,
  selectIsReplying,
} from '../../../Store/emailDetailSlice'
import SkipOption from '../Options/SkipOption'
import ForwardOption from '../Options/ForwardOption'
import UnsubscribeOption from '../Options/UnsubscribeOption'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
  unsubscribeLink: string | null
}

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

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false)
    }
  }, [location])

  // Use on legal labels - if there is at least 1 legal label, the item can be archived still.
  const staticEmailLabels = emailLabels(threadDetail)
  const staticOnlyLegalLabels = onlyLegalLabelObjects({
    labelNames: staticEmailLabels,
    storageLabels,
  })

  return (
    <S.EmailOptionsContainer tabbedView={isReplying || isForwarding}>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          <ReplyOption threadDetail={threadDetail} />
          <ForwardOption threadDetail={threadDetail} />
          {labelIds &&
            !labelIds.some(
              (item) =>
                item ===
                findLabelByName({
                  storageLabels,
                  LABEL_NAME: todo.LABEL,
                })[0]?.id
            ) && <ToDoOption threadDetail={threadDetail} />}
          {staticOnlyLegalLabels.length > 0 && (
            <ArchiveOption threadDetail={threadDetail} />
          )}
          {(coreStatus === global.CORE_STATUS_FOCUSED ||
            coreStatus === global.CORE_STATUS_SORTING) && <SkipOption />}
          {staticOnlyLegalLabels.length > 0 && (
            <MoreOption setShowMenu={setShowMenu} showMenu={showMenu} />
          )}
          {staticOnlyLegalLabels.length === 0 && (
            <DeleteOption
              messageId={threadDetail.id}
              icon={<FiDelete />}
              suppressed
              noArchive
            />
          )}
          {showMenu && <EmailMoreOptions messageId={threadDetail.id} />}
          {unsubscribeLink && (
            <>
              <S.Spacer />
              <UnsubscribeOption unsubscribeLink={unsubscribeLink} />
            </>
          )}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetailOptions
