import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { selectComposeEmail, TrackComposeEmail } from '../../Store/composeSlice'
import useDebounce from '../../Hooks/useDebounce'
import * as local from '../../constants/composeEmailConstants'
import emailValidation from '../../utils/emailValidation'
import { CreateUpdateDraft, selectDraftDetails } from '../../Store/draftsSlice'
import { selectCurrentMessage } from '../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import ComposeEmailView from './ComposeEmailView'
import { Contact } from '../../Store/contactsTypes'
import convertToContact from '../../utils/convertToContact'

// Props are coming from MessageOverview
interface ComposeEmailProps {
  isReplying: boolean
  isReplyingListener: Function
  to: Contact | null
  bcc: Contact | null
  cc: Contact | null
  subject: string
  threadId: string
}

const ComposeEmailContainer = ({
  isReplying,
  isReplyingListener,
  to,
  bcc,
  cc,
  subject,
  threadId,
}: ComposeEmailProps) => {
  const currentMessage = useAppSelector(selectCurrentMessage)
  const composeEmail = useAppSelector(selectComposeEmail)
  const draftDetails = useAppSelector(selectDraftDetails)
  const [toValue, setToValue] = useState<Contact[]>([])
  const debouncedToValue = useDebounce(toValue, 500)
  const [inputToValue, setInputToValue] = useState<string | number>('')
  const [showCC, setShowCC] = useState<boolean>(false)
  const [ccValue, setCCValue] = useState<Contact[]>([])
  const debouncedCCValue = useDebounce(ccValue, 500)
  const [inputCCValue, setInputCCValue] = useState<string | number>('')
  const [showBCC, setShowBCC] = useState<boolean>(false)
  const [bccValue, setBCCValue] = useState<Contact[]>([])
  const debouncedBCCValue = useDebounce(bccValue, 500)
  const [inputBCCValue, setInputBCCValue] = useState<string | number>('')
  const [subjectValue, setSubjectValue] = useState('')
  const debouncedSubjectValue = useDebounce(subjectValue, 500)
  const [bodyValue, setBodyValue] = useState('')
  const debouncedBodyValue = useDebounce(bodyValue, 500)
  const [toError, setToError] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isEmpty(composeEmail)) {
      dispatch(CreateUpdateDraft())
    }
  }, [composeEmail])

  useEffect(() => {
    if (!isEmpty(draftDetails)) {
      setSaveSuccess(true)
      setTimeout(() => {
        setSaveSuccess(false)
      }, 2500)
    }
  }, [draftDetails])

  const handleChangeRecipients = (recipientListRaw: any) => {
    const recipientList = {
      fieldId: recipientListRaw.fieldId,
      newValue: recipientListRaw.newValue.map(
        (item: string | Contact) => typeof (item) === 'string'
          ? { name: item, emailAddress: item } : item)
    }
    switch (recipientList.fieldId) {
      case local.TO: {
        const validation = emailValidation(recipientList.newValue)
        if (validation) {
          setToValue(recipientList.newValue)
        }
        if (!validation) {
          setToError(true)
        }
        break
      }
      case local.CC: {
        const validation = emailValidation(recipientList.newValue)
        if (validation) {
          setCCValue(recipientList.newValue)
        }
        if (!validation) {
          setToError(true)
        }
        break
      }
      case local.BCC: {
        const validation = emailValidation(recipientList.newValue)
        if (validation) {
          setBCCValue(recipientList.newValue)
        }
        if (!validation) {
          setToError(true)
        }
        break
      }
      default:
    }
  }

  const handleChangeSubjectBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case local.SUBJECT: {
        setSubjectValue(e.target.value)
        break
      }
      case local.BODY: {
        setBodyValue(e.target.value)
        break
      }
      default:
    }
  }

  const handleDelete = (selectedOption: any) => {
    const { option, fieldId } = selectedOption
    switch (fieldId) {
      case local.TO: {
        setToValue(toValue.filter(item => item !== option))
        break
      }
      case local.CC: {
        setCCValue(ccValue.filter(item => item !== option))
        break
      }
      case local.BCC: {
        setBCCValue(bccValue.filter(item => item !== option))
        break
      }
      default: {
        break
      }
    }
  }

  useEffect(() => {
    if (debouncedToValue) {
      if (emailValidation(debouncedToValue)) {
        const updateEventObject = { id: local.TO, value: debouncedToValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
    return () => { }
  }, [debouncedToValue])

  useEffect(() => {
    if (debouncedBCCValue) {
      if (emailValidation(debouncedBCCValue)) {
        const updateEventObject = { id: local.BCC, value: debouncedBCCValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
    return () => { }
  }, [debouncedBCCValue])

  useEffect(() => {
    if (debouncedCCValue) {
      if (emailValidation(debouncedCCValue)) {
        const updateEventObject = { id: local.CC, value: debouncedCCValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
    return () => { }
  }, [debouncedCCValue])

  useEffect(() => {
    if (debouncedSubjectValue) {
      const updateEventObject = {
        id: local.SUBJECT,
        value: debouncedSubjectValue,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => { }
  }, [debouncedSubjectValue])

  useEffect(() => {
    if (debouncedBodyValue) {
      const updateEventObject = { id: local.BODY, value: debouncedBodyValue }
      dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => { }
  }, [debouncedBodyValue])

  // Set the form values
  useEffect(() => {
    if (!isEmpty(composeEmail)) {
      setToValue(Array(composeEmail.to).map((item) => convertToContact(item)))
      if (composeEmail.cc && composeEmail.cc.length > 0) {
        setShowCC(true)
        setCCValue(Array(composeEmail.cc).map((item) => convertToContact(item)))
      }
      if (composeEmail.bcc && composeEmail.bcc.length > 0) {
        setShowBCC(true)
        setBCCValue(Array(composeEmail.bcc).map((item) => convertToContact(item)))
      }
      setSubjectValue(composeEmail.subject)
      setBodyValue(composeEmail.body)
    }
    // Form values coming from a new reply via MessageOverview
    if (to) setToValue([to])
    if (cc) setCCValue([cc])
    if (bcc) setBCCValue([bcc])
    if (subject) setSubjectValue(subject)
    return () => { }
  }, [])

  useEffect(() => {
    if (currentMessage && currentMessage.id) {
      const updateEventObject = {
        id: 'id',
        value: currentMessage.id,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => { }
  }, [currentMessage])

  useEffect(() => {
    if (threadId) {
      const updateEventObject = {
        id: 'threadId',
        value: threadId,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => { }
  }, [threadId])

  return (
    <ComposeEmailView
      bccValue={bccValue}
      bodyValue={bodyValue}
      ccValue={ccValue}
      draftDetails={draftDetails}
      handleChangeRecipients={handleChangeRecipients}
      handleChangeSubjectBody={handleChangeSubjectBody}
      handleDelete={handleDelete}
      inputToValue={inputToValue}
      inputCCValue={inputCCValue}
      inputBCCValue={inputBCCValue}
      isReplying={isReplying}
      isReplyingListener={isReplyingListener}
      toError={toError}
      toValue={toValue}
      setToError={setToError}
      saveSuccess={saveSuccess}
      showCC={showCC}
      showBCC={showBCC}
      setShowBCC={setShowBCC}
      setShowCC={setShowCC}
      setInputToValue={setInputToValue}
      setInputCCValue={setInputCCValue}
      setInputBCCValue={setInputBCCValue}
      subjectValue={subjectValue}
    />
  )
}

export default ComposeEmailContainer
