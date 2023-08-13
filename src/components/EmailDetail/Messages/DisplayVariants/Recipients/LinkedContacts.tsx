import { useState } from 'react'

import ContactCard from 'components/Elements/ContactCard/ContactCard'
import getSenderNameFull from 'components/Elements/SenderName/getSenderNameFull'
import Stack from 'components/Elements/Stack/Stack'
import * as S from 'components/EmailDetail/EmailDetailStyles'
import * as compose from 'constants/composeEmailConstants'
import * as emailDetail from 'constants/emailDetailConstants'
import { selectProfile } from 'store/baseSlice'
import { useAppSelector } from 'store/hooks'
import type { TContact } from 'store/storeTypes/contactsTypes'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import { Span } from 'styles/globalStyles'
import { handleContactConversion } from 'utils/convertToContact'

const MAX_CONTACTS_UNOPENED = 3

interface MappedContactsProps {
  contactsMap: Array<TContact>
  title: string
}

const MappedContacts = ({ contactsMap, title }: MappedContactsProps) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <S.ToFromBCCInner>
      <Span muted="true" small="true" style={{ marginRight: 'var(--spacing-0-5)' }}>
        {title}
      </Span>
      <S.SmallTextTruncated>
        {contactsMap.length > MAX_CONTACTS_UNOPENED ? (
          <S.FullContactContainer>
            {contactsMap
              .slice(0, showAll ? contactsMap.length : MAX_CONTACTS_UNOPENED)
              .map((contact, index) => (
                <S.ContactContainer key={contact.emailAddress}>
                  <S.SmallTextTruncated
                    showComma={
                      index !==
                      (showAll ? contactsMap.length : MAX_CONTACTS_UNOPENED) - 1
                    }
                  >
                    <ContactCard
                      userEmail={contact.emailAddress}
                      contact={contact}
                    >
                      <S.SmallTextTruncated title={contact.emailAddress ?? ''}>
                        {contact.name}
                      </S.SmallTextTruncated>
                    </ContactCard>
                  </S.SmallTextTruncated>
                </S.ContactContainer>
              ))}
            {!showAll && (
              <Span
                style={{ marginLeft: 'var(--spacing-0-5)', cursor: 'pointer' }}
                onClick={() => setShowAll(true)}
                aria-hidden="true"
              >
                & {contactsMap.length - MAX_CONTACTS_UNOPENED} others
              </Span>
            )}
          </S.FullContactContainer>
        ) : (
          contactsMap.map((contact, index) => (
            <S.SmallTextTruncated
              key={contact.emailAddress}
              showComma={index !== contactsMap.length - 1}
            >
              <ContactCard userEmail={contact.name} contact={contact}>
                <S.SmallTextTruncated>{contact.name}</S.SmallTextTruncated>
              </ContactCard>
            </S.SmallTextTruncated>
          ))
        )}
      </S.SmallTextTruncated>
    </S.ToFromBCCInner >
  )
}

const LinkedContants = ({
  message,
}: {
  message: TThreadObject['messages'][0]
}) => {
  const { emailAddress } = useAppSelector(selectProfile)
  const senderName = getSenderNameFull(
    message.payload.headers.from,
    emailAddress
  )
  const [firstSenderContact] = handleContactConversion(
    message.payload.headers.from,
    emailAddress
  )
  const toNameFull = handleContactConversion(
    message.payload.headers.to,
    emailAddress
  )
  const ccNameFull = handleContactConversion(
    message.payload.headers.cc,
    emailAddress
  )
  const bccNameFull = handleContactConversion(
    message.payload.headers.bcc,
    emailAddress
  )

  return (
    <Stack direction="vertical">
      <Stack>
        <S.ToFromBCCInner>
          <Span muted="true" small="true" style={{ marginRight: 'var(--spacing-0-5)' }}>
            {emailDetail.FROM_LABEL}
          </Span>
          {firstSenderContact ? (
            <ContactCard userEmail={senderName} contact={firstSenderContact}>
              <S.SmallTextTruncated>{senderName}</S.SmallTextTruncated>
            </ContactCard>
          ) : null}
        </S.ToFromBCCInner>
      </Stack>
      <Stack>
        <MappedContacts contactsMap={toNameFull} title={emailDetail.TO_LABEL} />
      </Stack>
      {
        ccNameFull.length > 0 && (
          <Stack>
            <MappedContacts contactsMap={ccNameFull} title={compose.CC_LABEL} />
          </Stack>
        )
      }
      {
        bccNameFull.length > 0 && (
          <Stack>
            <MappedContacts contactsMap={bccNameFull} title={compose.CC_LABEL} />
          </Stack>
        )
      }
    </Stack >
  )
}

export default LinkedContants
