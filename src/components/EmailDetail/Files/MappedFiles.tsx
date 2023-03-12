import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import getSenderNameFull from 'components/Elements/SenderName/getSenderNameFull'
import getSenderNamePartial from 'components/Elements/SenderName/getSenderNamePartial'
import Stack from 'components/Elements/Stack/Stack'
import TimeStampDisplay from 'components/Elements/TimeStamp/TimeStampDisplay'
import { selectProfile } from 'store/baseSlice'
import { useAppSelector } from 'store/hooks'
import { Span } from 'styles/globalStyles'

import DownloadButtonMultiple from './DownloadFileMultiple'
import { NO_IDENTICAL_FILES } from './FilesOverviewConstants'
import * as S from './FilesOverviewStyles'
import EmailAttachmentBubble from '../Attachment/EmailAttachmentBubble'
import type { IFilesOverview } from '../EmailDetailTypes'

const MappedFiles = ({
  threadDetail,
}: Pick<IFilesOverview, 'threadDetail'>) => {
  const { emailAddress } = useAppSelector(selectProfile)

  return threadDetail?.messages ? (
    <Stack direction="vertical" spacing="huge">
      <Stack align="center" justify="space-between">
        <Span muted small>
          {NO_IDENTICAL_FILES}
        </Span>
        <DownloadButtonMultiple
          filesObjectArray={threadDetail.messages.map((message) => ({
            id: message.id,
            files: message.payload.files,
          }))}
          isMainButton
        />
      </Stack>
      {threadDetail.messages
        .slice(0)
        .reverse()
        .map((message) => {
          const staticSenderNameFull = getSenderNameFull(
            message.payload.headers?.from,
            emailAddress
          )
          const staticSenderNamePartial = getSenderNamePartial(
            message.payload.headers?.from,
            emailAddress
          )

          if (message?.payload?.files && message.payload.files.length > 0) {
            return (
              <Stack direction="vertical" key={message.id} spacing="huge">
                <S.NameOptionsRow>
                  <Stack align="center">
                    <ContactCard
                      offset={[30, 10]}
                      userEmail={staticSenderNameFull}
                      contact={staticSenderNamePartial}
                    >
                      <EmailAvatar userEmail={staticSenderNameFull} />
                    </ContactCard>
                    <Span>{staticSenderNameFull}</Span>
                  </Stack>
                  <Stack align="center">
                    {message.payload.files.length > 1 && (
                      <DownloadButtonMultiple
                        filesObjectArray={[
                          { id: message.id, files: message.payload.files },
                        ]}
                      />
                    )}
                    <TimeStampDisplay threadTimeStamp={message.internalDate} />
                  </Stack>
                </S.NameOptionsRow>
                <Stack direction="vertical">
                  {message.payload.files.map((file) => (
                    <EmailAttachmentBubble
                      attachmentData={file}
                      messageId={message.id}
                      key={file.body.attachmentId}
                    />
                  ))}
                </Stack>
              </Stack>
            )
          }
          return null
        })}
    </Stack>
  ) : null
}

export default MappedFiles
