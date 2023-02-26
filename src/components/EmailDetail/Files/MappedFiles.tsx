import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import senderNameFull from 'components/Elements/SenderName/senderNameFull'
import senderNamePartial from 'components/Elements/SenderName/senderNamePartial'
import TimeStampDisplay from 'components/Elements/TimeStamp/TimeStampDisplay'
import { selectProfile } from 'store/baseSlice'
import { useAppSelector } from 'store/hooks'
import { Span } from 'styles/globalStyles'

import DownloadButtonMultiple from './DownloadFileMultiple'
import { NO_IDENTICAL_FILES } from './FilesOverviewConstants'
import * as S from './FilesOverviewStyles'
import type { IFilesOverview } from './FilesOverViewTypes'
import EmailAttachmentBubble from '../Attachment/EmailAttachmentBubble'

const MappedFiles = ({
  threadDetail,
}: Pick<IFilesOverview, 'threadDetail'>) => {
  const { emailAddress } = useAppSelector(selectProfile)
  return threadDetail?.messages ? (
    <div>
      <S.FilesHeader>
        <Span muted small>
          {NO_IDENTICAL_FILES}
        </Span>
        <S.DownloadAllContainer>
          <DownloadButtonMultiple
            filesObjectArray={threadDetail.messages.map((message) => ({
              id: message.id,
              files: message.payload.files,
            }))}
            isMainButton
          />
        </S.DownloadAllContainer>
      </S.FilesHeader>
      {threadDetail.messages
        .slice(0)
        .reverse()
        .map((message) => {
          const staticSenderNameFull = senderNameFull(
            message.payload.headers?.from,
            emailAddress
          )
          const staticSenderNamePartial = senderNamePartial(
            message.payload.headers?.from,
            emailAddress
          )

          if (message?.payload?.files && message.payload.files.length > 0) {
            return (
              <S.FileEmailRow key={message.id}>
                <S.NameOptionsRow>
                  <S.AvatarName>
                    <ContactCard
                      offset={[30, 10]}
                      userEmail={staticSenderNameFull}
                      contact={staticSenderNamePartial}
                    >
                      <EmailAvatar userEmail={staticSenderNameFull} />
                    </ContactCard>
                    <Span>{staticSenderNameFull}</Span>
                  </S.AvatarName>
                  <S.DownloadTimestampRow>
                    {message.payload.files.length > 1 && (
                      <DownloadButtonMultiple
                        filesObjectArray={[
                          { id: message.id, files: message.payload.files },
                        ]}
                      />
                    )}
                    <TimeStampDisplay threadTimeStamp={message.internalDate} />
                  </S.DownloadTimestampRow>
                </S.NameOptionsRow>
                <S.BubbleWrapper>
                  {message.payload.files.map((item) => (
                    <EmailAttachmentBubble
                      attachmentData={item}
                      messageId={message.id}
                      key={item.body.attachmentId}
                    />
                  ))}
                </S.BubbleWrapper>
              </S.FileEmailRow>
            )
          }
          return null
        })}
    </div>
  ) : null
}

export default MappedFiles
