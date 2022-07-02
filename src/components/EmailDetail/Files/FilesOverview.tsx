import { useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import * as local from '../../../constants/filesOverviewConstants'
import { IEmailListThreadItem } from '../../../Store/storeTypes/emailListTypes'
import TimeStampDisplay from '../../Elements/TimeStamp/TimeStampDisplay'
import SenderNameFull from '../../Elements/SenderName/senderNameFull'
import { selectProfile } from '../../../Store/baseSlice'
import { useAppSelector } from '../../../Store/hooks'
import checkAttachment from '../../../utils/checkAttachment'
import EmailAttachmentBubble from '../Attachment/EmailAttachmentBubble'
import EmailAvatar from '../../Elements/Avatar/EmailAvatar'
import { selectIsReplying, selectIsForwarding } from '../../../Store/emailDetailSlice'

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
          const result = checkAttachment(message)
          const staticSenderNameFull = SenderNameFull(message, emailAddress)
          if (result.length > 0) {
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
                  {result.map((item, index) => (
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
          return null
        })
    }
    return null
  }, [threadDetail])

  const staticFiles = files()?.filter((item) => item !== null)

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
        <S.FilesWrapper>
          {!isLoading && staticFiles && staticFiles.length > 0 ? (
            staticFiles
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
