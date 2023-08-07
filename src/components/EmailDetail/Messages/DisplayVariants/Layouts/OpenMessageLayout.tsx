import * as Separator from '@radix-ui/react-separator'

import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import EmailLabel from 'components/Elements/EmailLabel'
import Stack from 'components/Elements/Stack/Stack'
import TimeStamp from 'components/Elements/TimeStamp/TimeStampDisplay'
import EmailAttachment from 'components/EmailDetail/Attachment/EmailAttachment'
import * as S from 'components/EmailDetail/EmailDetailStyles'
import { EMAIL_BODY_VISIBLE, SEARCH_LABEL } from 'constants/globalConstants'

import type { OpenMessageLayoutProps } from './LayoutTypes'
import EmailDetailBody from '../../EmailDetailBody/EmailDetailBody'
import RemovedTrackers from '../../RemovedTrackers/RemovedTrackers'
import LinkedContacts from '../Recipients/LinkedContacts'

const OpenMessageLayout = ({
  draftHeaderControls = undefined,
  emailSubject,
  handleClick,
  hideMessage = false,
  isDraft = false,
  labelIds = undefined,
  message,
  removedTrackers = undefined,
  senderNameFull,
  senderNamePartial,
  specificEmailOptions = undefined,
}: OpenMessageLayoutProps) => (
  <S.EmailOpenWrapper isDraft={isDraft} hideDraft={hideMessage}>
    {draftHeaderControls || null}
    <Stack direction="vertical" spacing="huge">
      <Stack align="center" justify="space-between">
        <S.EmailAvatarGrid>
          <ContactCard
            offset={[30, 10]}
            userEmail={senderNameFull}
            contact={senderNamePartial}
          >
            <EmailAvatar userEmail={senderNameFull} />
          </ContactCard>
          <S.EmailDetailTitle
            title={emailSubject}
            style={{ cursor: 'pointer' }}
            onClick={handleClick}
          >
            {emailSubject}
          </S.EmailDetailTitle>
        </S.EmailAvatarGrid>
        <Stack>
          <EmailHasAttachmentSimple files={message.payload.files} />

          {labelIds && labelIds.includes(SEARCH_LABEL) ? (
            <EmailLabel labelIds={message.labelIds} />
          ) : null}

          <TimeStamp threadTimeStamp={message.internalDate} />

          {specificEmailOptions || null}
        </Stack>
      </Stack>
      <Stack direction="vertical">
        <LinkedContacts message={message} />
        {removedTrackers ? (
          <RemovedTrackers blockedTrackers={removedTrackers} />
        ) : null}
      </Stack>
      <Separator.Root
        style={{
          backgroundColor: 'var(--color-neutral-100)',
          height: '1px',
          width: '100%',
        }}
      />
      <S.EmailBody>
        <EmailDetailBody
          threadDetailBody={message.payload}
          detailBodyCSS={EMAIL_BODY_VISIBLE}
        />
      </S.EmailBody>
      <EmailAttachment message={message} />
    </Stack>
  </S.EmailOpenWrapper>
)

export default OpenMessageLayout
