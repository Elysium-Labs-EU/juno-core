import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as React from 'react'
import { FiSend } from 'react-icons/fi'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'
import useDebounce from '../../Hooks/useDebounce'
import * as local from '../../constants/composeEmailConstants'
import emailValidation from '../../utils/emailValidation'
import {
  createUpdateDraft,
  resetDraftDetails,
  selectDraftDetails,
  sendComposedEmail,
} from '../../Store/draftsSlice'
import {
  selectCurrentMessage,
  selectIsForwarding,
  selectIsReplying,
  setIsForwarding,
  setIsReplying,
} from '../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { Contact } from '../../Store/storeTypes/contactsTypes'
import convertToContact from '../../utils/convertToContact'
import CustomButton from '../Elements/Buttons/CustomButton'
import RecipientField from './ComposeFields/RecipientField'
import TipTap from './ComposeFields/TipTap/Tiptap'
import StyledTextField from './ComposeFields/EmailInput/EmailInputStyles'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'
import Seo from '../Elements/Seo'
import DiscardDraftButton from './DiscardDraftButton'
import { IComposeEmailReceive } from '../../Store/storeTypes/composeTypes'
import { refreshEmailFeed } from '../../Store/emailListSlice'

const handleContactConversion = (contactValue: string): Contact[] => {
  if (contactValue.length > 0 && typeof contactValue === 'string') {
    return contactValue.split(',').map((item) => convertToContact(item))
  }
  return []
}

// Props are coming from MessageOverview
interface IComposeEmailProps {
  to?: Contact | null
  bcc?: Contact | null
  cc?: Contact | null
  subject?: string
  threadId?: string
  foundBody?: string
  messageOverviewListener?: (value: string) => void
}

const ComposeEmail = ({
  to,
  bcc,
  cc,
  subject,
  threadId,
  foundBody,
  messageOverviewListener,
}: IComposeEmailProps) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const currentMessage = useAppSelector(selectCurrentMessage)
  const draftDetails = useAppSelector(selectDraftDetails)
  const [toValue, setToValue] = useState<Contact[]>([])
  const debouncedToValue = useDebounce(toValue, 500)
  const [inputToValue, setInputToValue] = useState<string>('')
  const [showCC, setShowCC] = useState<boolean>(false)
  const [ccValue, setCCValue] = useState<Contact[]>([])
  const debouncedCCValue = useDebounce(ccValue, 500)
  const [inputCCValue, setInputCCValue] = useState<string>('')
  const [showBCC, setShowBCC] = useState<boolean>(false)
  const [bccValue, setBCCValue] = useState<Contact[]>([])
  const debouncedBCCValue = useDebounce(bccValue, 500)
  const [inputBCCValue, setInputBCCValue] = useState<string>('')
  const [subjectValue, setSubjectValue] = useState('')
  const debouncedSubjectValue = useDebounce(subjectValue, 500)
  const [bodyValue, setBodyValue] = useState('')
  const [toError, setToError] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const keysPressed = useMultiKeyPress()
  const userInteractedRef = useRef(false)
  const [composedEmail, setComposedEmail] = useState<any>({})

  const updateComposeEmail = useCallback(
    (action: { id: string; value: string | Contact[] }, mounted: boolean) => {
      if (action.id && action.value) {
        const { id, value } = action
        mounted &&
          setComposedEmail({
            ...composedEmail,
            [id]: value,
          })
      }
    },
    [composedEmail]
  )

  useEffect(() => {
    if (
      draftDetails &&
      Object.keys(draftDetails).length > 0 &&
      userInteractedRef.current
    ) {
      dispatch(resetDraftDetails())
    }
  }, [])

  useEffect(() => {
    if (keysPressed.length > 0 && !userInteractedRef.current) {
      userInteractedRef.current = true
    }
  }, [keysPressed])

  // Listen to any changes of the composeEmail object to update the draft
  useEffect(() => {
    let mounted = true
    if (!isEmpty(composedEmail) && userInteractedRef.current) {
      mounted && dispatch(createUpdateDraft({ composedEmail }))
    }
    return () => {
      mounted = false
    }
  }, [composedEmail])

  useEffect(() => {
    let mounted = true
    if (!isEmpty(draftDetails) && mounted && userInteractedRef.current) {
      setSaveSuccess(true)
      const timer = setTimeout(() => {
        setSaveSuccess(false)
      }, 2500)
      return () => {
        clearTimeout(timer)
      }
    }
    return () => {
      mounted = false
    }
  }, [draftDetails])

  const recipientListTransform = (recipientListRaw: any) => ({
    fieldId: recipientListRaw.fieldId,
    newValue: recipientListRaw.newValue.map((item: string | Contact) =>
      typeof item === 'string' ? { name: item, emailAddress: item } : item
    ),
  })

  const handleChangeTo = useCallback(
    (recipientListRaw: any) => {
      const recipientList = recipientListTransform(recipientListRaw)
      const validation = emailValidation(recipientList.newValue)
      if (validation) {
        setToValue(recipientList.newValue)
        toError && setToError(false)
      }
      if (!validation) {
        setToError(true)
      }
    },
    [toValue]
  )

  const handleChangeCC = useCallback(
    (recipientListRaw: any) => {
      const recipientList = recipientListTransform(recipientListRaw)
      const validation = emailValidation(recipientList.newValue)
      if (validation) {
        setCCValue(recipientList.newValue)
        toError && setToError(false)
      }
      if (!validation) {
        setToError(true)
      }
    },
    [ccValue]
  )

  const handleChangeBCC = useCallback(
    (recipientListRaw: any) => {
      const recipientList = recipientListTransform(recipientListRaw)
      const validation = emailValidation(recipientList.newValue)
      if (validation) {
        setBCCValue(recipientList.newValue)
        toError && setToError(false)
      }
      if (!validation) {
        setToError(true)
      }
    },
    [bccValue]
  )

  const handleChangeSubject = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubjectValue(e.target.value)
    },
    [subjectValue]
  )

  const handleDelete = useCallback((selectedOption: any) => {
    const { option, fieldId } = selectedOption
    switch (fieldId) {
      case local.TO: {
        setToValue(toValue.filter((item) => item !== option))
        break
      }
      case local.CC: {
        setCCValue(ccValue.filter((item) => item !== option))
        break
      }
      case local.BCC: {
        setBCCValue(bccValue.filter((item) => item !== option))
        break
      }
      default: {
        break
      }
    }
  }, [])

  useEffect(() => {
    let mounted = true
    if (debouncedToValue && debouncedToValue.length > 0) {
      if (emailValidation(debouncedToValue)) {
        const updateEventObject = { id: local.TO, value: debouncedToValue }
        updateComposeEmail(updateEventObject, mounted)
      }
    }
    return () => {
      mounted = false
    }
  }, [debouncedToValue])

  useEffect(() => {
    let mounted = true
    if (debouncedBCCValue && debouncedBCCValue.length > 0) {
      if (emailValidation(debouncedBCCValue)) {
        const updateEventObject = { id: local.BCC, value: debouncedBCCValue }
        updateComposeEmail(updateEventObject, mounted)
      }
    }
    return () => {
      mounted = false
    }
  }, [debouncedBCCValue])

  useEffect(() => {
    let mounted = true
    if (debouncedCCValue && debouncedCCValue.length > 0) {
      if (emailValidation(debouncedCCValue)) {
        const updateEventObject = { id: local.CC, value: debouncedCCValue }
        updateComposeEmail(updateEventObject, mounted)
      }
    }
    return () => {
      mounted = false
    }
  }, [debouncedCCValue])

  useEffect(() => {
    let mounted = true
    if (debouncedSubjectValue) {
      const updateEventObject = {
        id: local.SUBJECT,
        value: debouncedSubjectValue,
      }
      updateComposeEmail(updateEventObject, mounted)
    }
    return () => {
      mounted = false
    }
  }, [debouncedSubjectValue])

  // Set the form values
  useEffect(() => {
    let mounted = true
    if (mounted) {
      const { mailto, body }: { mailto?: string; body?: string } = qs.parse(
        window.location.search,
        {
          ignoreQueryPrefix: true,
        }
      )
      if (mailto || (body && isEmpty(composedEmail))) {
        if (mailto?.includes('@')) {
          setToValue(handleContactConversion(mailto))
        }
        if (mailto?.includes('subject')) {
          setSubjectValue(mailto.replace('?subject=', ''))
        }
        if (body) {
          setBodyValue(body)
        }
      }
      // composeEmail object coming from a draft item on the draft list via the pushed route
      if (location?.state) {
        const state = location.state as IComposeEmailReceive
        if (state.to && state.to.length > 0) {
          setToValue(handleContactConversion(state.to))
        }
        if (state.cc && state.cc.length > 0) {
          setShowCC(true)
          setCCValue(handleContactConversion(state.cc))
        }
        if (state.bcc && state.bcc.length > 0) {
          setShowBCC(true)
          setBCCValue(handleContactConversion(state.bcc))
        }
        setSubjectValue(state.subject)
        setBodyValue(state.body)
      }
      if (!mailto && isEmpty(composedEmail)) {
        console.log(foundBody)
        // Form values coming from a new reply via MessagesOverview (EmailDetail)
        if (to) {
          setToValue([to])
        }
        if (cc) {
          setCCValue([cc])
        }
        if (bcc) {
          setBCCValue([bcc])
        }
        if (subject) {
          setSubjectValue(subject)
        }
        if (foundBody) {
          setBodyValue(foundBody)
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true
    if (currentMessage) {
      const updateEventObject = {
        id: 'id',
        value: currentMessage,
      }
      updateComposeEmail(updateEventObject, mounted)
    }
    return () => {
      mounted = false
    }
  }, [currentMessage])

  useEffect(() => {
    let mounted = true
    if (threadId) {
      const updateEventObject = {
        id: 'threadId',
        value: threadId,
      }
      updateComposeEmail(updateEventObject, mounted)
    }
    return () => {
      mounted = false
    }
  }, [threadId])

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (toValue.length > 0) {
        if (emailValidation(toValue)) {
          dispatch(sendComposedEmail({ composedEmail }))
          dispatch(resetDraftDetails())
          // dispatch(
          //   listRemoveDraft({ threadId: draftDetails?.message?.threadId })
          // )
          // archiveMail({
          //   messageId: threadDetail.id,
          //   labelIds,
          //   dispatch,
          // })
        } else {
          setToError(true)
        }
      } else {
        setToError(true)
      }
    },
    [toValue, draftDetails, toError]
  )

  const handleCancelButton = () => {
    if (isReplying) {
      dispatch(setIsReplying(false))
    }
    if (isForwarding) {
      dispatch(setIsForwarding(false))
    }
    dispatch(refreshEmailFeed())
    dispatch(resetDraftDetails())
  }

  const ToField = useMemo(
    () => (
      <RecipientField
        recipientFieldValue={toValue}
        fieldId={local.TO}
        fieldLabel={local.TO_LABEL}
        toError={toError}
        handleChangeRecipients={handleChangeTo}
        inputValue={inputToValue}
        setInputValue={setInputToValue}
        handleDelete={handleDelete}
        showField={!isReplying}
      />
    ),
    [inputToValue, toError, handleChangeTo]
  )

  const CcField = useMemo(
    () => (
      <RecipientField
        recipientFieldValue={ccValue}
        fieldId={local.CC}
        fieldLabel={local.CC_LABEL}
        toError={toError}
        handleChangeRecipients={handleChangeCC}
        inputValue={inputCCValue}
        setInputValue={setInputCCValue}
        handleDelete={handleDelete}
        showField={showCC}
      />
    ),
    [inputCCValue, toError, handleChangeCC]
  )

  const BccField = useMemo(
    () => (
      <RecipientField
        recipientFieldValue={bccValue}
        fieldId={local.BCC}
        fieldLabel={local.BCC_LABEL}
        toError={toError}
        handleChangeRecipients={handleChangeBCC}
        inputValue={inputBCCValue}
        setInputValue={setInputBCCValue}
        handleDelete={handleDelete}
        showField={showBCC}
      />
    ),
    [inputBCCValue, toError, handleChangeBCC]
  )

  const SubjectField = useMemo(
    () => (
      <StyledTextField
        id={local.SUBJECT}
        value={subjectValue ?? ''}
        onChange={handleChangeSubject}
        fullWidth
        variant="outlined"
      />
    ),
    [subjectValue, handleChangeSubject]
  )

  const BodyField = useMemo(
    () => (
      <TipTap
        fetchedBodyValue={bodyValue}
        updateComposeEmail={updateComposeEmail}
      />
    ),
    [bodyValue, composedEmail]
  )

  return (
    <>
      <Seo title={local.COMPOSE} />
      <S.Wrapper tabbedView={(isReplying || isForwarding) ?? false}>
        <S.UpdateContainer>
          {saveSuccess && (
            <GS.TextMutedSpan>{local.DRAFT_SAVED}</GS.TextMutedSpan>
          )}
        </S.UpdateContainer>
        <S.ComposerContainer tabbedView={(isReplying || isForwarding) ?? false}>
          <GS.Base>
            <form onSubmit={onSubmit} autoComplete="off">
              <div style={{ marginBottom: `7px` }}>
                <GS.Base>
                  <S.Row>
                    {ToField}
                    <S.CcBccContainer>
                      {!showCC && (
                        <CustomButton
                          label={local.CC_LABEL}
                          onClick={() => setShowCC(true)}
                        />
                      )}
                      {!showBCC && (
                        <CustomButton
                          label={local.BCC_LABEL}
                          onClick={() => setShowBCC(true)}
                        />
                      )}
                    </S.CcBccContainer>
                  </S.Row>
                  {showCC && <S.Row>{CcField}</S.Row>}
                  {showBCC && <S.Row>{BccField}</S.Row>}
                  <S.Row>
                    <S.Label hasValue={Boolean(subjectValue)}>
                      <label htmlFor={local.SUBJECT}>
                        {local.SUBJECT_LABEL}
                      </label>
                    </S.Label>
                    {SubjectField}
                  </S.Row>
                  <S.Row>{BodyField}</S.Row>
                </GS.Base>
              </div>
              <S.ButtonContainer>
                <CustomButton
                  type="submit"
                  label={local.SEND_BUTTON}
                  icon={<FiSend />}
                  suppressed
                />
                {(isReplying || isForwarding) && (
                  <CustomButton
                    label={local.CANCEL_BUTTON}
                    onClick={() => handleCancelButton()}
                    suppressed
                  />
                )}
                {draftDetails?.id && (
                  <S.DiscardContainer>
                    <DiscardDraftButton
                      draftId={draftDetails.id}
                      messageOverviewListener={messageOverviewListener}
                    />
                  </S.DiscardContainer>
                )}
              </S.ButtonContainer>
            </form>
          </GS.Base>
        </S.ComposerContainer>
      </S.Wrapper>
    </>
  )
}

export default ComposeEmail

ComposeEmail.defaultProps = {
  to: null,
  bcc: null,
  cc: null,
  subject: null,
  threadId: null,
  foundBody: null,
  messageOverviewListener: undefined,
}
