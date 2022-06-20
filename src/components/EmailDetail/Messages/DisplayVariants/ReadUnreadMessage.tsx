import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import EmailAttachment from '../../Attachment/EmailAttachment'
import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import * as local from '../../../../constants/unreadConstants'
import * as compose from '../../../../constants/composeEmailConstants'
import * as emailDetail from '../../../../constants/emailDetailConstants'
import * as S from '../../EmailDetailStyles'
import * as global from '../../../../constants/globalConstants'
import EmailHasAttachment from '../../../Elements/EmailHasAttachment'
import {
  IEmailMessage,
  IEmailListThreadItem,
} from '../../../../Store/storeTypes/emailListTypes'
import SpecificEmailOptions from '../SpecificEmailOptions'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import { useAppSelector } from '../../../../Store/hooks'
import { selectIsReplying } from '../../../../Store/emailDetailSlice'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import EmailSubject from '../../../Elements/EmailSubject'
import EmailSnippet from '../../../Elements/EmailSnippet'
import convertToContact from '../../../../utils/convertToContact'
import { selectProfile } from '../../../../Store/baseSlice'
import ToBCCNameFull from '../../../Elements/ToBCCNameFull'
import Seo from '../../../Elements/Seo'
import RemovedTrackers from '../RemovedTrackers/RemovedTrackers'

interface IReadMessage {
  message: IEmailMessage
  threadDetail: IEmailListThreadItem
  messageIndex: number
  setUnsubscribeLink: Function
  setContentRendered: (value: boolean) => void
}

const ReadUnreadMessage = ({
  message,
  threadDetail,
  messageIndex,
  setUnsubscribeLink,
  setContentRendered,
}: IReadMessage) => {
  const [open, setOpen] = useState<boolean>(message && messageIndex === 0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [blockedTrackers, setBlockedTrackers] = useState<Attr[] | []>([])
  const isReplying = useAppSelector(selectIsReplying)
  const { emailAddress } = useAppSelector(selectProfile)

  useEffect(() => {
    if (threadDetail && threadDetail.messages) {
      if (threadDetail.messages.length > 1) {
        if (message && message.labelIds?.includes(local.UNREAD)) {
          setOpen(true)
          return
        }
        if (
          message &&
          !Object.prototype.hasOwnProperty.call(message, 'labelIds') &&
          messageIndex === 0
        ) {
          setOpen(true)
          return
        }
      }
      if (threadDetail.messages.length === 1) {
        setOpen(true)
      }
    }
  }, [])

  const handleSpecificMenu =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
      setShowMenu((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
    }
  const popperId = showMenu ? 'specifc-email-popper' : undefined

  const handleClick = () => {
    setOpen((currState) => !currState)
    if (anchorEl) {
      setAnchorEl(null)
      setShowMenu(false)
    }
  }

  useEffect(() => {
    if (isReplying) {
      setAnchorEl(null)
      setShowMenu(false)
    }
  }, [isReplying])

  const staticSenderNameFull = useMemo(
    () => SenderNameFull(message, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message, emailAddress),
    []
  )
  const staticToNameFull = useMemo(
    () =>
      ToBCCNameFull(message, 'To')
        .split(',')
        .map((item) => convertToContact(item)),
    []
  )
  const staticCCNameFull = useMemo(() => ToBCCNameFull(message, 'Cc'), [])
  const staticBCCNameFull = useMemo(() => ToBCCNameFull(message, 'Bcc'), [])
  const staticEmailSubject = useMemo(() => EmailSubject(message), [])
  const staticSnippet = useMemo(() => EmailSnippet(message), [])

  return (
    <>
      <Seo title={staticEmailSubject} />
      {open && (
        <S.EmailOpenWrapper>
          <S.TopContainer>
            <S.HeaderFullWidth>
              <S.ClickHeader onClick={handleClick} aria-hidden="true">
                <EmailAvatar avatarURL={staticSenderNameFull} />
                <S.EmailDetailTitle title={staticEmailSubject}>
                  {staticEmailSubject}
                </S.EmailDetailTitle>
              </S.ClickHeader>
              <S.TimeAttachmentContainer>
                <S.ChildDiv>
                  <EmailHasAttachment messages={message} />
                </S.ChildDiv>
                <S.ChildDiv>
                  <TimeStamp threadTimeStamp={message.internalDate} />
                </S.ChildDiv>
                <S.ChildDiv>
                  <CustomIconButton
                    onClick={handleSpecificMenu('bottom-start')}
                    icon={<FiChevronDown />}
                    aria-describedby={popperId}
                  />
                </S.ChildDiv>
                <Popper
                  id={popperId}
                  open={showMenu}
                  anchorEl={anchorEl}
                  placement={placement}
                >
                  <SpecificEmailOptions
                    messageId={message?.id}
                    messageIndex={messageIndex}
                  />
                </Popper>
              </S.TimeAttachmentContainer>
            </S.HeaderFullWidth>
          </S.TopContainer>
          <S.FromContainer
            multipleComponents={Boolean(
              staticToNameFull || staticCCNameFull || staticBCCNameFull
            )}
          >
            <S.ToFromBCCInner>
              <S.SmallTextMuted>{emailDetail.FROM_LABEL}</S.SmallTextMuted>
              <S.SmallTextTruncated>
                {staticSenderNameFull}
              </S.SmallTextTruncated>
            </S.ToFromBCCInner>
          </S.FromContainer>
          <S.ToBCCContainer
            multipleComponents={Boolean(
              staticToNameFull && (staticCCNameFull || staticBCCNameFull)
            )}
          >
            <S.ToFromBCCInner>
              <S.SmallTextMuted>{emailDetail.TO_LABEL}</S.SmallTextMuted>
              <S.SmallTextTruncated>
                {staticToNameFull.map((contact) => (
                  <S.SmallTextTruncated
                    key={contact.emailAddress}
                    title={contact.emailAddress}
                  >
                    {contact.name}
                  </S.SmallTextTruncated>
                ))}
              </S.SmallTextTruncated>
            </S.ToFromBCCInner>
            {staticCCNameFull && staticCCNameFull.length > 0 && (
              <S.ToFromBCCInner>
                <S.SmallTextMuted>{compose.CC_LABEL}</S.SmallTextMuted>
                <S.SmallTextTruncated
                  title={convertToContact(staticCCNameFull).emailAddress}
                >
                  {convertToContact(staticCCNameFull).name}
                </S.SmallTextTruncated>
              </S.ToFromBCCInner>
            )}
            {staticBCCNameFull && staticBCCNameFull.length > 0 && (
              <S.ToFromBCCInner>
                <S.SmallTextMuted>{compose.BCC_LABEL}</S.SmallTextMuted>
                <S.SmallTextTruncated
                  title={convertToContact(staticBCCNameFull).emailAddress}
                >
                  {convertToContact(staticBCCNameFull).name}
                </S.SmallTextTruncated>
              </S.ToFromBCCInner>
            )}
          </S.ToBCCContainer>
          {blockedTrackers.length > 0 && (
            <RemovedTrackers blockedTrackers={blockedTrackers} />
          )}
          <S.GreyDivider />
          <S.EmailBody>
            {message && message?.payload && message?.id && (
              <EmailDetailBody
                threadDetailBody={message.payload}
                messageId={message.id}
                detailBodyCSS={global.EMAIL_BODY_VISIBLE}
                setUnsubscribeLink={setUnsubscribeLink}
                setContentRendered={setContentRendered}
                setBlockedTrackers={setBlockedTrackers}
              />
            )}
          </S.EmailBody>
          <EmailAttachment message={message} />
        </S.EmailOpenWrapper>
      )}

      {!open && (
        <S.EmailClosedWrapper onClick={handleClick} aria-hidden="true">
          <S.ClosedMessageWrapper>
            <S.ClosedAvatarSender>
              <EmailAvatar avatarURL={staticSenderNameFull} />
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
                <EmailHasAttachment messages={message} />
              </S.ChildDiv>
              <S.ChildDiv>
                <TimeStamp threadTimeStamp={message.internalDate} />
              </S.ChildDiv>
            </S.TimeAttachmentContainer>
          </S.ClosedMessageWrapper>
        </S.EmailClosedWrapper>
      )}
    </>
  )
}

export default ReadUnreadMessage
