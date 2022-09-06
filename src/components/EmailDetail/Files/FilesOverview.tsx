import { useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import * as local from '../../../constants/filesOverviewConstants'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'
import TimeStampDisplay from '../../Elements/TimeStamp/TimeStampDisplay'
import senderNameFull from '../../Elements/SenderName/senderNameFull'
import { selectProfile } from '../../../store/baseSlice'
import { useAppSelector } from '../../../store/hooks'
import EmailAttachmentBubble from '../Attachment/EmailAttachmentBubble'
import EmailAvatar from '../../Elements/Avatar/EmailAvatar'
import {
  selectIsReplying,
  selectIsForwarding,
} from '../../../store/emailDetailSlice'

interface IFilesOverview {
  threadDetail: IEmailListThreadItem | null
  isLoading: boolean
}

const FilesOverview = ({ threadDetail, isLoading }: IFilesOverview) => {
  const { emailAddress } = useAppSelector(selectProfile)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)

  const files = useCallback(() => {
    if (threadDetail?.messages) {
      return threadDetail.messages
        .slice(0)
        .reverse()
        .map((message) => {
          const staticSenderNameFull = senderNameFull(
            message.payload.headers?.from,
            emailAddress
          )
          if (message?.payload?.files && message.payload.files.length > 0) {
            return (
              <S.FileEmailRow key={message.id}>
                <S.NameTimestampRow>
                  <S.AvatarName>
                    <EmailAvatar avatarURL={staticSenderNameFull} />
                    <span>{staticSenderNameFull}</span>
                  </S.AvatarName>
                  <TimeStampDisplay threadTimeStamp={message.internalDate} />
                </S.NameTimestampRow>
                <S.BubbleWrapper>
                  {message.payload.files.map((item, index) => (
                    <EmailAttachmentBubble
                      attachmentData={item}
                      messageId={message.id}
                      key={item.body.attachmentId}
                      index={index}
                    />
                  ))}
                </S.BubbleWrapper>
              </S.FileEmailRow>
            )
          }
          return []
        })
    }
    return []
  }, [threadDetail])

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
        <S.FilesWrapper>
          {!isLoading && files() && files().length > 0 ? (
            files()
          ) : (
            <span>{local.NO_FILES}</span>
          )}
          {isLoading && <CircularProgress />}
        </S.FilesWrapper>
      </ES.EmailDetailContainer>
      <ES.EmailOptionsPlaceholder />
    </ES.DetailRow>
  )
}

export default FilesOverview
