import { useState } from 'react'
import convertToContact from '../../../../../utils/convertToContact'
import ToBCCNameFull from '../../../../Elements/ToBCCNameFull'
import * as S from '../../../EmailDetailStyles'
import * as GS from '../../../../../styles/globalStyles'
import * as compose from '../../../../../constants/composeEmailConstants'
import * as emailDetail from '../../../../../constants/emailDetailConstants'
import SenderNameFull from '../../../../Elements/SenderName/senderNameFull'
import { selectProfile } from '../../../../../store/baseSlice'
import { useAppSelector } from '../../../../../store/hooks'
import { IEmailMessage } from '../../../../../store/storeTypes/emailListTypes'
import { IContact } from '../../../../../store/storeTypes/contactsTypes'

const MappedContacts = ({ contactsMap, title }: { contactsMap: IContact[], title: string }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <S.ToFromBCCInner>
      <GS.TextMutedSpanSmall style={{ marginRight: '4px' }}>{title}</GS.TextMutedSpanSmall>
      <S.SmallTextTruncated>
        {contactsMap.length > 2 ? (
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {contactsMap.slice(0, showAll ? contactsMap.length : 3).map((contact, index) => (
              <S.SmallTextTruncated key={contact.emailAddress} showComma={index !== (showAll ? contactsMap.length : 3) - 1}>
                <S.SmallTextTruncated
                  title={contact.emailAddress}
                >
                  {contact.name}
                </S.SmallTextTruncated>
              </S.SmallTextTruncated>
            ))}
            {!showAll && <span style={{ marginLeft: '6px', cursor: 'pointer' }} onClick={() => setShowAll(true)} aria-hidden="true"> & {contactsMap.length - 3} others</span>}
          </div>
        ) : (
          contactsMap.map((contact) => (
            <S.SmallTextTruncated
              key={contact.emailAddress}
              title={contact.emailAddress}
            >
              {contact.name}
            </S.SmallTextTruncated>
          ))
        )}
      </S.SmallTextTruncated>
    </S.ToFromBCCInner>
  )
}

const LinkedContants = ({ message }: { message: IEmailMessage }) => {
  const { emailAddress } = useAppSelector(selectProfile)

  const senderNameFull = SenderNameFull(message, emailAddress)
  const toNameFull = () => {
    const toValues = ToBCCNameFull(message, 'To')
    if (toValues) {
      return toValues.split(',')
        .map((item) => convertToContact(item))
    }
    return []
  }
  const ccNameFull = () => {
    const toValues = ToBCCNameFull(message, 'Cc')
    if (toValues) {
      return toValues.split(',')
        .map((item) => convertToContact(item))
    }
    return []
  }
  const bccNameFull = () => {
    const toValues = ToBCCNameFull(message, 'Bcc')
    if (toValues) {
      return toValues.split(',')
        .map((item) => convertToContact(item))
    }
    return []
  }

  return (
    <>
      <S.FromContainer
        multipleComponents={Boolean(toNameFull().length > 0 || ccNameFull().length > 0 || bccNameFull().length > 0)}
      >
        <S.ToFromBCCInner>
          <GS.TextMutedSpanSmall style={{ marginRight: '4px' }}>{emailDetail.FROM_LABEL}</GS.TextMutedSpanSmall>
          <S.SmallTextTruncated>{senderNameFull}</S.SmallTextTruncated>
        </S.ToFromBCCInner>
      </S.FromContainer>
      <S.ToBCCContainer
        multipleComponents={Boolean(toNameFull().length > 0 && (ccNameFull().length > 0 || bccNameFull().length > 0))}
      >
        <MappedContacts contactsMap={toNameFull()} title={emailDetail.TO_LABEL} />
        {ccNameFull && ccNameFull.length > 0 && (
          <MappedContacts contactsMap={ccNameFull()} title={compose.CC_LABEL} />
        )}
        {bccNameFull && bccNameFull.length > 0 && (
          <MappedContacts contactsMap={bccNameFull()} title={compose.BCC_LABEL} />
        )}
      </S.ToBCCContainer>
    </>
  )
}

export default LinkedContants
