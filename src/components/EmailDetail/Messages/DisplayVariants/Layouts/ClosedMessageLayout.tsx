import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import Stack from 'components/Elements/Stack/Stack'
import TimeStamp from 'components/Elements/TimeStamp/TimeStampDisplay'
import * as S from 'components/EmailDetail/EmailDetailStyles'
import { Span } from 'styles/globalStyles'

import type { ClosedMessageLayoutProps } from './LayoutTypes'
import { DRAFT_SNIPPET_INDICATOR } from 'constants/globalConstants'

const ClosedMessageLayout = ({
  handleClick,
  isDraft = false,
  // labelIds = undefined,
  message,
  emailSnippet,
  senderNameFull,
  senderNamePartial,
}: ClosedMessageLayoutProps) => (
  <S.EmailClosedWrapper
    aria-hidden="true"
    isDraft={isDraft}
    onClick={handleClick}
    title="Click to open"
  >
    <S.ClosedMessageWrapper>
      <Stack>
        <S.ClosedAvatarSender>
          <ContactCard
            offset={[30, 10]}
            userEmail={senderNameFull}
            contact={senderNamePartial}
          >
            <EmailAvatar userEmail={senderNameFull} />
          </ContactCard>
          <S.ClosedSender>
            <Span
              style={{
                fontStyle: isDraft ? 'italic' : 'unset',
                fontWeight: isDraft ? 'unset' : 'bold',
              }}
              title={senderNamePartial.emailAddress ?? ''}
            >
              {senderNamePartial.name}
            </Span>
          </S.ClosedSender>
        </S.ClosedAvatarSender>
      </Stack>
      <S.ClosedSnippet>
        <Stack>
          {isDraft ? (
            <Span style={{ fontWeight: 'bold' }}>
              {DRAFT_SNIPPET_INDICATOR}
            </Span>
          ) : null}
          <Span style={{ fontStyle: 'italic' }}>{emailSnippet}</Span>
          {!isDraft ? (
            <EmailHasAttachmentSimple files={message.payload.files} />
          ) : null}
        </Stack>
      </S.ClosedSnippet>
      <Stack>
        <TimeStamp threadTimeStamp={message.internalDate} />
      </Stack>
    </S.ClosedMessageWrapper>
  </S.EmailClosedWrapper>
)

export default ClosedMessageLayout
