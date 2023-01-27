import { useState } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledPopover from 'components/Elements/StyledPopover'
import isForwardingListener from 'components/EmailOptions/IsForwardingListener'
import isReplyingListener from 'components/EmailOptions/IsReplyingListener'
import thrashMail from 'components/EmailOptions/ThrashMail'
import * as global from 'constants/globalConstants'
import {
  QiChevronDown,
  QiFolderTrash,
  QiForward,
  QiReply,
} from 'images/svgIcons/quillIcons'
import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { updateMessageLabel } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'

import type { IReadMessage } from './DisplayVariants/ReadUnreadMessage'
import * as S from './SpecificEmailOptionsStyles'

const SpecificEmailOptions = ({
  handleClickListener,
  messageIndex,
  setShouldRefreshDetail,
  threadDetail,
}: Pick<
  IReadMessage,
  | 'handleClickListener'
  | 'messageIndex'
  | 'setShouldRefreshDetail'
  | 'threadDetail'
>) => {
  const dispatch = useAppDispatch()
  const labelIds = useAppSelector(selectLabelIds)
  const isForwarding = useAppSelector(selectIsForwarding)
  const isReplying = useAppSelector(selectIsReplying)
  const activeMessage = threadDetail?.messages[messageIndex]
  const isTrash = activeMessage?.labelIds.includes(global.TRASH_LABEL)
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(true)
    }
    if (!isOpen) {
      setOpen(false)
    }
  }

  const thrashMessage = () => {
    if (
      threadDetail?.messages &&
      threadDetail.messages.length > 1 &&
      activeMessage
    ) {
      dispatch(
        updateMessageLabel({
          threadId: threadDetail.id,
          messageId: activeMessage.id,
          request: { delete: true },
        })
      )
    } else if (threadDetail?.id) {
      thrashMail({ threadId: threadDetail.id, labelIds, dispatch })
    }
  }

  return (
    <StyledPopover
      triggerButton={
        <CustomIconButton
          onClick={() => {}}
          icon={<QiChevronDown />}
          title="Show message options"
          ariaHaspopup="true"
          ariaControls={open ? 'menu' : undefined}
          ariaExpanded={open || undefined}
        />
      }
      open={open}
      onOpenChange={handleOpenChange}
    >
      <S.Inner>
        <CustomButton
          label="Reply to this message"
          onClick={() => {
            setOpen(false)
            handleClickListener({ mIndex: messageIndex })
            isReplyingListener({
              dispatch,
              isForwarding,
            })
          }}
          icon={<QiReply />}
          style={{ color: 'var(--color-white' }}
          title="Reply to this message"
        />
        <CustomButton
          label="Forward this message"
          onClick={() => {
            setOpen(false)
            handleClickListener({ mIndex: messageIndex })
            isForwardingListener({
              dispatch,
              isReplying,
            })
          }}
          icon={<QiForward />}
          style={{ color: 'var(--color-white' }}
          title="Forward this message"
        />
        {!isTrash && (
          <CustomButton
            label="Delete this message"
            onClick={() => {
              setOpen(false)
              setShouldRefreshDetail(true)
              thrashMessage()
            }}
            icon={<QiFolderTrash />}
            style={{ color: 'var(--color-white' }}
            title="Delete this message"
          />
        )}
      </S.Inner>
    </StyledPopover>
  )
}

export default SpecificEmailOptions
