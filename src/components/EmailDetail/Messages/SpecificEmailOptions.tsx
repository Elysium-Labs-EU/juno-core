import { useState } from 'react'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Stack from 'components/Elements/Stack/Stack'
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

import * as S from './SpecificEmailOptionsStyles'
import type { IReadMessage } from '../EmailDetailTypes'

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
  const [open, setOpen] = useState<boolean>(false)
  const activeMessage = threadDetail?.messages[messageIndex]
  const isTrash = activeMessage?.labelIds.includes(global.TRASH_LABEL)

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
      onOpenChange={handleOpenChange}
      open={open}
      triggerButton={
        <CustomIconButton
          ariaControls={open ? 'menu' : undefined}
          ariaExpanded={open || undefined}
          ariaHaspopup="true"
          icon={<QiChevronDown />}
          title="Show message options"
        />
      }
    >
      <Stack direction="vertical" spacing="mini">
        <S.StyledCustomButton
          icon={<QiReply />}
          label="Reply to this message"
          onClick={() => {
            setOpen(false)
            handleClickListener({ mIndex: messageIndex })
            isReplyingListener({
              dispatch,
              isForwarding,
            })
          }}
          title="Reply to this message"
        />
        <S.StyledCustomButton
          icon={<QiForward />}
          label="Forward this message"
          onClick={() => {
            setOpen(false)
            handleClickListener({ mIndex: messageIndex })
            isForwardingListener({
              dispatch,
              isReplying,
            })
          }}
          title="Forward this message"
        />
        {!isTrash ? (
          <S.StyledCustomButton
            icon={<QiFolderTrash />}
            label="Delete this message"
            onClick={() => {
              setOpen(false)
              setShouldRefreshDetail(true)
              thrashMessage()
            }}
            title="Delete this message"
          />
        ) : null}
      </Stack>
    </StyledPopover>
  )
}

export default SpecificEmailOptions
