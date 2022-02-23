import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as React from 'react'
import { FiSend } from 'react-icons/fi'
import isEmpty from 'lodash/isEmpty'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'
import {
  selectComposeEmail,
  sendComposedEmail,
  trackComposeEmail,
} from '../../Store/composeSlice'
import useDebounce from '../../Hooks/useDebounce'
import * as local from '../../constants/composeEmailConstants'
import emailValidation from '../../utils/emailValidation'
import {
  createUpdateDraft,
  listRemoveDraft,
  resetDraftDetails,
  selectDraftDetails,
} from '../../Store/draftsSlice'
import { selectCurrentMessage } from '../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { Contact } from '../../Store/contactsTypes'
import convertToContact from '../../utils/convertToContact'
import CustomButton from '../Elements/Buttons/CustomButton'
import RecipientField from './ComposeFields/RecipientField'
import QuillBody from './ComposeFields/QuillBody/QuillBody'
import StyledTextField from './ComposeFields/EmailInput/EmailInputStyles'

// Props are coming from MessageOverview
interface IComposeEmailProps {
  isReplying?: boolean
  isReplyingListener?: Function
  to?: Contact | null
  bcc?: Contact | null
  cc?: Contact | null
  subject?: string
  threadId?: string
}

const ComposeEmail = ({
  isReplying,
  isReplyingListener,
  to,
  bcc,
  cc,
  subject,
  threadId,
}: IComposeEmailProps) => {
  const currentMessage = useAppSelector(selectCurrentMessage)
  const composeEmail = useAppSelector(selectComposeEmail)
  const draftDetails = useAppSelector(selectDraftDetails)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)

  const toInput = useRef(null)
  if (document.activeElement === toInput.current) {
    // do something
    console.log('I am focused')
  }

  // TODO: Do only trigger the update of the items when a field is focused.

  useEffect(() => {
    // console.log(toInput.current && toInput.current.children.firstChild)
    console.log(document.activeElement)
  }, [toInput])

  const [toValue, setToValue] = useState<Contact[]>([])
  const debouncedToValue = useDebounce(toValue, 500)
  const [inputToValue, setInputToValue] = useState<string>('')
  const [toError, setToError] = useState<boolean>(false)

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

  const dispatch = useAppDispatch()

  // TODO: Do not trigger the createUpdateDraft if the initial load is identical to what is already on the emailList item for the draft item.\
  // If draft exists on the emailList, trigger a flow where it will not createOrUpdateDraft on the initial round.

  useEffect(() => {
    let mounted = true
    if (!isEmpty(composeEmail) && /(<\w*)((\s\/>)|(.*<\/\w*>))/gm.test(composeEmail.body)) {
      mounted && dispatch(createUpdateDraft())
    }
    return () => {
      mounted = false
    }
  }, [composeEmail])

  useEffect(() => {
    let mounted = true
    if (!isEmpty(draftDetails) && mounted && !draftDetails.skipSave) {
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

  const handleDelete = (selectedOption: any) => {
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
  }

  useEffect(() => {
    let mounted = true
    if (debouncedToValue && debouncedToValue.length > 0) {
      if (emailValidation(debouncedToValue)) {
        const updateEventObject = { id: local.TO, value: debouncedToValue }
        mounted && dispatch(trackComposeEmail(updateEventObject))
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
        mounted && dispatch(trackComposeEmail(updateEventObject))
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
        mounted && dispatch(trackComposeEmail(updateEventObject))
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
      mounted && dispatch(trackComposeEmail(updateEventObject))
    }
    return () => {
      mounted = false
    }
  }, [debouncedSubjectValue])

  // Set the form values from an earlier draft
  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (!isEmpty(composeEmail)) {
        setToValue(
          Array(composeEmail.to).filter((item) =>
            item || null).map((item) => convertToContact(item))
        )
        if (composeEmail.cc && composeEmail.cc.length > 0) {
          setShowCC(true)
          setCCValue(
            Array(composeEmail.to).filter((item) =>
              item || null).map((item) => convertToContact(item))
          )
        }
        if (composeEmail.bcc && composeEmail.bcc.length > 0) {
          setShowBCC(true)
          setBCCValue(
            Array(composeEmail.to).filter((item) =>
              item || null).map((item) => convertToContact(item))
          )
        }
        setSubjectValue(composeEmail.subject)
        setBodyValue(composeEmail.body)
      }
      // Form values coming from a new reply via MessageOverview
      if (to) setToValue([to])
      if (cc) setCCValue([cc])
      if (bcc) setBCCValue([bcc])
      if (subject) setSubjectValue(subject)
    }
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let mounted = true
    if (currentMessage && currentMessage.id) {
      const updateEventObject = {
        id: 'id',
        value: currentMessage.id,
      }
      mounted && dispatch(trackComposeEmail(updateEventObject))
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
      mounted && dispatch(trackComposeEmail(updateEventObject))
    }
    return () => {
      mounted = false
    }
  }, [threadId])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (toValue.length > 0) {
      if (emailValidation(toValue)) {
        dispatch(sendComposedEmail())
        dispatch(resetDraftDetails())
        dispatch(listRemoveDraft({ threadId: draftDetails.message.threadId }))
      } else {
        setToError(true)
      }
    }
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
        ref={toInput}
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
    () => <QuillBody fetchedBodyValue={bodyValue} />,
    [bodyValue]
  )

  return (
    <S.Wrapper isReplying={isReplying ?? false}>
      <S.UpdateContainer>
        {saveSuccess && (
          <GS.TextMutedSpan>{local.DRAFT_SAVED}</GS.TextMutedSpan>
        )}
      </S.UpdateContainer>
      <S.ComposerContainer isReplying={isReplying ?? false}>
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
                    <label htmlFor={local.SUBJECT}>{local.SUBJECT_LABEL}</label>
                  </S.Label>
                  {SubjectField}
                </S.Row>
                <S.Row>{BodyField}</S.Row>
              </GS.Base>
            </div>
            <CustomButton
              type="submit"
              label={local.SEND_BUTTON}
              disabled={!toValue}
              icon={<FiSend />}
              suppressed
            />
            {isReplying && isReplyingListener && (
              <CustomButton
                label={local.CANCEL_BUTTON}
                onClick={() => isReplyingListener(-1)}
                suppressed
              />
            )}
          </form>
        </GS.Base>
      </S.ComposerContainer>
    </S.Wrapper>
  )
}

export default ComposeEmail

ComposeEmail.defaultProps = {
  isReplying: false,
  isReplyingListener: null,
  to: null,
  bcc: null,
  cc: null,
  subject: null,
  threadId: null,
}
