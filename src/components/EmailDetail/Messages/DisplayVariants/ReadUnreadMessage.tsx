import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import Popper, { PopperPlacementType } from '@mui/material/Popper'

import * as global from '../../../../constants/globalConstants'
import useClickOutside from '../../../../hooks/useClickOutside'
import { QiChevronDown } from '../../../../images/svgIcons/quillIcons'
import { selectProfile } from '../../../../store/baseSlice'
import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../../store/emailDetailSlice'
import { useAppSelector } from '../../../../store/hooks'
import { selectLabelIds } from '../../../../store/labelsSlice'
import {
  IEmailListThreadItem,
  IEmailMessage,
} from '../../../../store/storeTypes/emailListTypes'
import ContactCard from '../../../Elements/ContactCard/ContactCard'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import EmailHasAttachmentSimple from '../../../Elements/EmailHasAttachmentSimple'
import EmailLabel from '../../../Elements/EmailLabel'
import EmailSnippet from '../../../Elements/EmailSnippet'
import EmailSubject from '../../../Elements/EmailSubject'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import Seo from '../../../Elements/Seo'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import EmailAttachment from '../../Attachment/EmailAttachment'
import * as S from '../../EmailDetailStyles'
import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import RemovedTrackers from '../RemovedTrackers/RemovedTrackers'
import SpecificEmailOptions from '../SpecificEmailOptions'
import LinkedContacts from './Recipients/LinkedContacts'

interface IReadMessage {
  handleClickListener: ({ mIndex }: { mIndex: number }) => void
  message: IEmailMessage
  messageIndex: number
  threadDetail: IEmailListThreadItem
  setUnsubscribeLink: (value: string | null) => void
  setShouldRefreshDetail: (value: boolean) => void
}

const ReadUnreadMessage = ({
  handleClickListener,
  message,
  messageIndex,
  threadDetail,
  setUnsubscribeLink,
  setShouldRefreshDetail,
}: IReadMessage) => {
  const labelIds = useAppSelector(selectLabelIds)
  const [open, setOpen] = useState<boolean>(message && messageIndex === 0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [blockedTrackers, setBlockedTrackers] = useState<string[] | []>([])
  const isForwarding = useAppSelector(selectIsForwarding)
  const isReplying = useAppSelector(selectIsReplying)
  const { emailAddress } = useAppSelector(selectProfile)
  const { ref } = useClickOutside({
    onClickOutside: () => {
      setAnchorEl(null)
      setShowMenu(false)
    },
  })

  useEffect(() => {
    let mounted = true
    if (threadDetail && threadDetail?.messages) {
      if (threadDetail.messages.length > 1 && mounted) {
        if (message && message?.labelIds?.includes(global.UNREAD_LABEL)) {
          setOpen(true)
        }
        if (
          message &&
          !Object.prototype.hasOwnProperty.call(message, 'labelIds') &&
          messageIndex === 0
        ) {
          setOpen(true)
        }
      }
      if (threadDetail.messages.length === 1) {
        setOpen(true)
      }
      if (
        threadDetail.messages.length > 1 &&
        threadDetail.messages.some((item) =>
          item?.labelIds?.includes(global.DRAFT_LABEL)
        )
      ) {
        setOpen(true)
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  /**
   * In case the only other email in this thread isn't visible during opening a Draft in tab view, open it.
   */
  useEffect(() => {
    let mounted = true
    if (threadDetail && threadDetail.messages && !open) {
      if (
        isReplying &&
        threadDetail.messages.length === 2 &&
        threadDetail.messages.some((item) =>
          item.labelIds.includes(global.DRAFT_LABEL)
        ) &&
        mounted
      ) {
        setOpen(true)
      }
    }
    return () => {
      mounted = false
    }
  }, [isReplying, open])

  const handleSpecificMenu =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
      setShowMenu((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
    }
  const menuPopperId = showMenu ? 'specifc-email-popper' : undefined

  /**
   * Open or close the email detail - if there is a Popper active, close it.
   */
  const handleClick = () => {
    setOpen((currState) => !currState)
    if (anchorEl) {
      setAnchorEl(null)
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if (isForwarding || isReplying) {
      setAnchorEl(null)
      setShowMenu(false)
    }
  }, [isForwarding, isReplying])

  const staticSenderNameFull = useMemo(
    () => SenderNameFull(message.payload.headers?.from, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message.payload.headers?.from, emailAddress),
    []
  )
  const staticEmailSubject = useMemo(
    () => EmailSubject(message.payload.headers?.subject),
    []
  )
  const staticSnippet = useMemo(() => EmailSnippet(message), [])

  const memoizedClosedEmail = useMemo(
    () => (
      <S.EmailClosedWrapper onClick={handleClick} aria-hidden="true">
        <S.ClosedMessageWrapper>
          <S.ClosedAvatarSender>
            <ContactCard
              offset={[30, 10]}
              userEmail={staticSenderNameFull}
              contact={staticSenderNamePartial}
            >
              <EmailAvatar userEmail={staticSenderNameFull} />
            </ContactCard>
            <S.ClosedSender>
              <span
                style={{ fontWeight: 'bold' }}
                title={staticSenderNamePartial?.emailAddress}
              >
                {staticSenderNamePartial?.name}
              </span>
            </S.ClosedSender>
          </S.ClosedAvatarSender>
          <S.ClosedSnippet>{staticSnippet}</S.ClosedSnippet>
          <S.TimeAttachmentContainer>
            <S.ChildDiv>
              <EmailHasAttachmentSimple files={message?.payload?.files} />
            </S.ChildDiv>

            <S.ChildDiv>
              <TimeStamp threadTimeStamp={message.internalDate} />
            </S.ChildDiv>
          </S.TimeAttachmentContainer>
        </S.ClosedMessageWrapper>
      </S.EmailClosedWrapper>
    ),
    [message, staticSenderNamePartial, staticSenderNameFull]
  )

  return (
    <>
      <Seo title={staticEmailSubject} />
      {open && (
        <S.EmailOpenWrapper>
          <S.TopContainer>
            <S.HeaderFullWidth>
              <S.ClickHeader onClick={handleClick} aria-hidden="true">
                <ContactCard
                  offset={[30, 10]}
                  userEmail={staticSenderNameFull}
                  contact={staticSenderNamePartial}
                >
                  <EmailAvatar userEmail={staticSenderNameFull} />
                </ContactCard>
                <S.EmailDetailTitle title={staticEmailSubject}>
                  {staticEmailSubject}
                </S.EmailDetailTitle>
              </S.ClickHeader>
              <S.TimeAttachmentContainer>
                <S.ChildDiv>
                  <EmailHasAttachmentSimple files={message?.payload?.files} />
                </S.ChildDiv>
                {labelIds.includes(global.SEARCH_LABEL) && (
                  <EmailLabel labelNames={message.labelIds} />
                )}
                <S.ChildDiv>
                  <TimeStamp threadTimeStamp={message.internalDate} />
                </S.ChildDiv>
                <S.ChildDiv>
                  <CustomIconButton
                    onClick={handleSpecificMenu('bottom-start')}
                    icon={<QiChevronDown />}
                    aria-describedby={menuPopperId}
                    title="Show message options"
                  />
                </S.ChildDiv>
                <Popper
                  id={menuPopperId}
                  open={showMenu}
                  anchorEl={anchorEl}
                  placement={placement}
                  ref={ref}
                >
                  <SpecificEmailOptions
                    messageIndex={messageIndex}
                    handleClickListener={handleClickListener}
                    threadDetail={threadDetail}
                    setShouldRefreshDetail={setShouldRefreshDetail}
                  />
                </Popper>
              </S.TimeAttachmentContainer>
            </S.HeaderFullWidth>
          </S.TopContainer>
          <LinkedContacts message={message} />
          {blockedTrackers.length > 0 && (
            <RemovedTrackers blockedTrackers={blockedTrackers} />
          )}
          <S.GreyDivider />
          <S.EmailBody>
            {message && message?.payload && message?.id && (
              <EmailDetailBody
                threadDetailBody={message.payload}
                detailBodyCSS={global.EMAIL_BODY_VISIBLE}
                setUnsubscribeLink={setUnsubscribeLink}
                setBlockedTrackers={setBlockedTrackers}
              />
            )}
          </S.EmailBody>
          <EmailAttachment message={message} />
        </S.EmailOpenWrapper>
      )}
      {!open && memoizedClosedEmail}
    </>
  )
}

export default ReadUnreadMessage
