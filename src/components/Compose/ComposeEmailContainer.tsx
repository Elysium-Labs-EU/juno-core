import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useParams } from 'react-router-dom'
import { selectComposeEmail, TrackComposeEmail } from '../../Store/composeSlice'
import useDebounce from '../../Hooks/useDebounce'
import * as global from '../../constants/globalConstants'
import emailValidation from '../../utils/emailValidation'
import { CreateDraft, selectDraftDetails, UpdateDraft } from '../../Store/draftsSlice'
import { selectCurrentMessage } from '../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import ComposeEmailView from './ComposeEmailView'

// Props are coming from MessageOverview
interface ComposeEmailProps {
  isReplying: boolean
  isReplyingListener: Function
  to: string
  bcc: string
  cc: string
  subject: string
  threadId: string
}

const ComposeEmail = ({
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
  const [toValue, setToValue] = useState<string>('')
  const debouncedToValue = useDebounce(toValue, 500)
  const [showCC, setShowCC] = useState<boolean>(false)
  const [ccValue, setCCValue] = useState<string>('')
  const debouncedCCValue = useDebounce(ccValue, 500)
  const [showBCC, setShowBCC] = useState<boolean>(false)
  const [bccValue, setBCCValue] = useState<string>('')
  const debouncedBCCValue = useDebounce(bccValue, 500)
  const [subjectValue, setSubjectValue] = useState('')
  const debouncedSubjectValue = useDebounce(subjectValue, 500)
  const [bodyValue, setBodyValue] = useState('')
  const debouncedBodyValue = useDebounce(bodyValue, 500)
  const [toError, setToError] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { messageId } = useParams<{ messageId: string }>()


  useEffect(() => {
    if (!messageId && Object.values(composeEmail).length > 0 && isEmpty(draftDetails)) {
      dispatch(CreateDraft())
    } else if (!isEmpty(draftDetails) && messageId) {
      dispatch(UpdateDraft())
    } else if (!isEmpty(draftDetails)) {
      dispatch(UpdateDraft())
    }
  }, [composeEmail, messageId])

  useEffect(() => {
    if (!isEmpty(draftDetails)) {
      setSaveSuccess(true)
      setTimeout(() => {
        setSaveSuccess(false)
      }, 2500)
    }
  }, [draftDetails])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === global.TO) {
      setToValue(e.target.value)
      return
    }
    if (e.target.id === global.SUBJECT) {
      setSubjectValue(e.target.value)
      return
    }
    if (e.target.id === global.BODY) {
      setBodyValue(e.target.value)
      return
    }
    if (e.target.id === global.CC) {
      setCCValue(e.target.value)
      return
    }
    if (e.target.id === global.BCC) {
      setBCCValue(e.target.value)
    }
  }

  useEffect(() => {
    if (debouncedToValue && debouncedToValue.length > 0) {
      if (emailValidation(debouncedToValue)) {
        const updateEventObject = { id: global.TO, value: debouncedToValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
    return () => { }
  }, [debouncedToValue])

  useEffect(() => {
    if (debouncedBCCValue && debouncedBCCValue.length > 0) {
      if (emailValidation(debouncedBCCValue)) {
        const updateEventObject = { id: global.BCC, value: debouncedBCCValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
    return () => { }
  }, [debouncedBCCValue])

  useEffect(() => {
    if (debouncedCCValue && debouncedCCValue.length > 0) {
      if (emailValidation(debouncedCCValue)) {
        const updateEventObject = { id: global.CC, value: debouncedCCValue }
        dispatch(TrackComposeEmail(updateEventObject))
      }
    }
    return () => { }
  }, [debouncedCCValue])

  useEffect(() => {
    if (debouncedSubjectValue) {
      const updateEventObject = {
        id: global.SUBJECT,
        value: debouncedSubjectValue,
      }
      dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => { }
  }, [debouncedSubjectValue])

  useEffect(() => {
    if (debouncedBodyValue) {
      const updateEventObject = { id: global.BODY, value: debouncedBodyValue }
      dispatch(TrackComposeEmail(updateEventObject))
    }
    return () => { }
  }, [debouncedBodyValue])

  // Set the form values
  useEffect(() => {
    if (composeEmail) {
      setToValue(composeEmail.to)
      if (composeEmail.length > 0) {
        setShowCC(true)
        setCCValue(composeEmail.cc)
      }
      setSubjectValue(composeEmail.subject)
      setBodyValue(composeEmail.body)
    }
    if (to || subject || cc || bcc) {
      cc && setCCValue(cc)
      bcc && setBCCValue(bcc)
      to && setToValue(to)
      subject && setSubjectValue(subject)
    }
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
      handleChange={handleChange}
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
      subjectValue={subjectValue}
    />
  )
}

export default ComposeEmail
