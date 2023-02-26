import { useState } from 'react'

import ContactCard from 'components/Elements/ContactCard/ContactCard'
import senderNameFull from 'components/Elements/SenderName/senderNameFull'
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

interface IMappedContacts {
  contactsMap: Array<TContact>
  title: string
}

const MappedContacts = ({ contactsMap, title }: IMappedContacts) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <S.ToFromBCCInner>
      <Span muted small style={{ marginRight: '4px' }}>
        {title}
      </Span>
      <S.SmallTextTruncated>
        {contactsMap.length > MAX_CONTACTS_UNOPENED ? (
          <S.FullContactContainer>
            {contactsMap
              .slice(0, showAll ? contactsMap.length : MAX_CONTACTS_UNOPENED)
              .map((contact, index) => (
                <S.ContactContainer>
                  <S.SmallTextTruncated
                    key={contact.emailAddress}
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
                style={{ marginLeft: '4px', cursor: 'pointer' }}
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
    </S.ToFromBCCInner>
  )
}

const LinkedContants = ({
  message,
}: {
  message: TThreadObject['messages'][0]
}) => {
  const { emailAddress } = useAppSelector(selectProfile)
  const senderName = senderNameFull(message.payload.headers?.from, emailAddress)
  const [firstSenderContact] = handleContactConversion(
    message?.payload?.headers?.from,
    emailAddress
  )
  const toNameFull = handleContactConversion(
    message?.payload?.headers?.to,
    emailAddress
  )
  const ccNameFull = handleContactConversion(
    message?.payload?.headers?.cc,
    emailAddress
  )
  const bccNameFull = handleContactConversion(
    message?.payload?.headers?.bcc,
    emailAddress
  )

  return (
    <>
      <S.ContactsContainer>
        <S.ToFromBCCInner>
          <Span muted small style={{ marginRight: 'var(--spacing-0-5)' }}>
            {emailDetail.FROM_LABEL}
          </Span>
          {firstSenderContact ? (
            <ContactCard userEmail={senderName} contact={firstSenderContact}>
              <S.SmallTextTruncated>{senderName}</S.SmallTextTruncated>
            </ContactCard>
          ) : null}
        </S.ToFromBCCInner>
      </S.ContactsContainer>
      <S.ContactsContainer>
        <MappedContacts contactsMap={toNameFull} title={emailDetail.TO_LABEL} />
      </S.ContactsContainer>
      {ccNameFull.length > 0 && (
        <S.ContactsContainer>
          <MappedContacts contactsMap={ccNameFull} title={compose.CC_LABEL} />
        </S.ContactsContainer>
      )}
      {bccNameFull.length > 0 && (
        <S.ContactsContainer>
          <MappedContacts contactsMap={bccNameFull} title={compose.CC_LABEL} />
        </S.ContactsContainer>
      )}
    </>
  )
}

export default LinkedContants
