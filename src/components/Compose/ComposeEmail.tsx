import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as React from 'react'
import isEmpty from 'lodash/isEmpty'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import * as S from './ComposeStyles'
import * as GS from '../../styles/globalStyles'
import * as local from '../../constants/composeEmailConstants'
import * as keyConstants from '../../constants/keyConstants'
import {
  createUpdateDraft,
  fetchDrafts,
  resetDraftDetails,
  selectDraftDetails,
  sendComposedEmail,
} from '../../store/draftsSlice'
import {
  selectCurrentMessage,
  selectIsForwarding,
  selectIsReplying,
  setIsForwarding,
  setIsReplying,
} from '../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IContact } from '../../store/storeTypes/contactsTypes'
import CustomButton from '../Elements/Buttons/CustomButton'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import Seo from '../Elements/Seo'
import DiscardDraftButton from './DiscardDraftButton'
import { IComposeEmailReceive } from '../../store/storeTypes/composeTypes'
import { refreshEmailFeed } from '../../store/emailListSlice'
import SignatureEmail from './ComposeFields/Signature/SignatureEmail'
import { setModifierKey } from '../../utils/setModifierKey'
import { selectActiveModal, selectInSearch } from '../../store/utilsSlice'
import { IRecipientsList } from './ComposeEmailTypes'
import { handleContactConversion } from '../../utils/convertToContact'
import { QiSend } from '../../images/svgIcons/quillIcons'
import Attachments from './ComposeFields/Attachments/Attachments'
import useFetchDraftList from '../../hooks/useFetchDraftList'
import convertB64AttachmentToFile from '../../utils/convertB64AttachmentToFile'
import ContactField from './ComposeFields/ContactField'
import SubjectField from './ComposeFields/SubjectField'
import BodyField from './ComposeFields/BodyField/BodyField'
import * as global from '../../constants/globalConstants'

export const recipientListTransform = (recipientListRaw: IRecipientsList) => ({
  fieldId: recipientListRaw.fieldId,
  newValue: recipientListRaw.newValue.map((item: string | IContact) =>
    typeof item === 'string' ? { name: item, emailAddress: item } : item
  ),
})

// Props are coming from MessageOverview (email detail view)
interface IComposeEmailProps {
  to?: IContact[] | null
  bcc?: IContact[] | null
  cc?: IContact[] | null
  subject?: string | null
  threadId?: string | null
  foundBody?: string | null
  files?: any
  messageOverviewListener?: (value: string) => void
}

const actionKeys = [setModifierKey, keyConstants.KEY_ENTER]

const ComposeEmail = ({
  to = null,
  bcc = null,
  cc = null,
  subject = null,
  threadId = null,
  foundBody = null,
  files = null,
  messageOverviewListener = undefined,
}: IComposeEmailProps) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const currentMessage = useAppSelector(selectCurrentMessage)
  const draftDetails = useAppSelector(selectDraftDetails)
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const [showCC, setShowCC] = useState<boolean>(false)
  const [showBCC, setShowBCC] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const keysPressed = useMultiKeyPress()
  const [composedEmail, setComposedEmail] = useState<any>(undefined)
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [hasInteracted, setHasInteracted] = useState(false)
  const userInteractedRef = useRef(false)
  useFetchDraftList(draftDetails)

  useEffect(() => {
    console.log('composedEmail', composedEmail)
  }, [composedEmail])

  const updateComposeEmail = useCallback(
    (action: { id: string; value: string | IContact[] | null | File[] }) => {
      if ('id' in action && 'value' in action) {
        const { id, value } = action
        console.log('pre action composedEmail', composedEmail)
        console.log('action', action)
        setComposedEmail({
          ...composedEmail,
          [id]: value,
        })
      }
    },
    [composedEmail]
  )

  // Why is this?
  // useEffect(() => {
  //   if (
  //     draftDetails &&
  //     Object.keys(draftDetails).length > 0 &&
  //     userInteractedRef.current
  //   ) {
  //     dispatch(resetDraftDetails())
  //   }
  // }, [])

  // A function to change the userInteractedRef to true - this should only occur when the user has interacted with the opened draft.
  // The flag is used to allow the system to update the draft.
  useEffect(() => {
    if (!userInteractedRef.current) {
      if (keysPressed.length > 0 || hasInteracted) {
        userInteractedRef.current = true
      }
    }
  }, [keysPressed, hasInteracted])

  // Listen to any changes of the composeEmail object to update the draft
  useEffect(() => {
    console.log('TO SEND AS UPDATE PRE', composedEmail)
    let mounted = true
    if (!isEmpty(composedEmail) && userInteractedRef.current) {
      console.log('TO SEND AS UPDATE', composedEmail)
      // mounted && dispatch(createUpdateDraft({ composedEmail }))
    }
    return () => {
      mounted = false
    }
  }, [composedEmail])

  // Based on the changes in the draftDetails, notify the user that the save was successful
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

  // Set the form values that come either from the location state or the URL.
  useEffect(() => {
    let mounted = true
    if (mounted && loadState === global.LOAD_STATE_MAP.idle) {
      // const { mailto, body }: { mailto?: string; body?: string } = qs.parse(
      //   window.location.search,
      //   {
      //     ignoreQueryPrefix: true,
      //   }
      // )
      // if (mailto || (body && isEmpty(composedEmail))) {
      //   if (mailto?.includes('@')) {
      //     setPresetToValue(handleContactConversion(mailto))
      //   }
      //   if (mailto?.includes('subject')) {
      //     setPresetSubjectValue(mailto.replace('?subject=', ''))
      //   }
      //   if (body) {
      //     setPresetBodyValue(body)
      //   }
      // }
      // composeEmail object coming from a draft item on the draft list via the pushed route
      if (location?.state) {
        const state = location.state as IComposeEmailReceive
        const handlePresetvalueConversions = () => {
          const presetValueBody: any = {}
          if (state.id && state.id.length > 0) {
            presetValueBody.id = state.id
          }
          if (state.to && state.to.length > 0) {
            presetValueBody.to = handleContactConversion(state.to)
          }
          if (state.cc && state.cc.length > 0) {
            setShowCC(true)
            presetValueBody.cc = handleContactConversion(state.cc)
          }
          if (state.bcc && state.bcc.length > 0) {
            setShowBCC(true)
            presetValueBody.bcc = handleContactConversion(state.bcc)
          }
          if (state.subject) {
            presetValueBody.subject = state.subject
          }
          if (state.body) {
            presetValueBody.body = state.body
          }
          if (state.files && state.files.length > 0) {
            presetValueBody.files = state.files
          }
          return presetValueBody
        }
        const output = handlePresetvalueConversions()
        setComposedEmail(output)
      }
    }
    setLoadState(global.LOAD_STATE_MAP.loaded)
    return () => {
      mounted = false
    }
  }, [])

  // Set the form values via the passed props from the email detail
  // useEffect(() => {
  //   let mounted = true
  //   if (mounted) {
  //     // Form values coming from a new reply via MessagesOverview (EmailDetail)
  //     if (to && to.length > 0) {
  //       setPresetToValue(to)
  //     }
  //     if (cc && cc.length > 0) {
  //       setShowCC(true)
  //       setPresetCCValue(cc)
  //     }
  //     if (bcc && bcc.length > 0) {
  //       setShowBCC(true)
  //       setPresetBCCValue(bcc)
  //     }
  //     if (subject) {
  //       setPresetSubjectValue(subject)
  //     }
  //     if (foundBody) {
  //       setPresetBodyValue(foundBody)
  //     }
  //     // if (files && files.length > 0) {
  //     // TODO: Find the ID value from the message overview
  //     //   const convertFiles = async () => {
  //     //     const response = await convertB64AttachmentToFile({ id: state.id, files: state.files })
  //     //     if (response && response.length > 0) {
  //     //       setUploadedFiles(response)
  //     //     }
  //     //   }
  //     //   convertFiles()
  //     // }
  //   }
  //   return () => {
  //     mounted = false
  //   }
  // }, [to, cc, bcc, subject, foundBody])

  useEffect(() => {
    if (currentMessage) {
      const updateEventObject = {
        id: 'id',
        value: currentMessage,
      }
      updateComposeEmail(updateEventObject)
    }
  }, [currentMessage])

  useEffect(() => {
    if (threadId) {
      const updateEventObject = {
        id: 'threadId',
        value: threadId,
      }
      updateComposeEmail(updateEventObject)
    }
  }, [threadId])

  const handleSubmit = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (e) {
        e.preventDefault()
      }
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
    },
    [composedEmail]
  )

  const handleCancelButton = useCallback(() => {
    if (isReplying) {
      dispatch(setIsReplying(false))
    }
    if (isForwarding) {
      dispatch(setIsForwarding(false))
    }
    dispatch(refreshEmailFeed())
    dispatch(fetchDrafts())
    dispatch(resetDraftDetails())
  }, [isReplying, isForwarding, dispatch])

  const memoizedToField = useMemo(
    () => (
      <ContactField
        updateComposeEmail={updateComposeEmail}
        composeValue={composedEmail?.to}
        loadState={loadState}
        showField={!isReplying}
        id={local.TO}
        label={local.TO_LABEL}
        setHasInteracted={setHasInteracted}
        hasInteracted={hasInteracted}
      />
    ),
    [isReplying, composedEmail, loadState, hasInteracted]
  )

  const memoizedCCField = useMemo(
    () => (
      <ContactField
        updateComposeEmail={updateComposeEmail}
        composeValue={composedEmail?.cc}
        loadState={loadState}
        showField={showCC}
        id={local.CC}
        label={local.CC_LABEL}
        setHasInteracted={setHasInteracted}
        hasInteracted={hasInteracted}
      />
    ),
    [showCC, composedEmail, loadState, hasInteracted]
  )

  const memoizedBCCField = useMemo(
    () => (
      <ContactField
        updateComposeEmail={updateComposeEmail}
        composeValue={composedEmail?.bcc}
        loadState={loadState}
        showField={showBCC}
        id={local.BCC}
        label={local.BCC_LABEL}
        setHasInteracted={setHasInteracted}
        hasInteracted={hasInteracted}
      />
    ),
    [showBCC, composedEmail, loadState, hasInteracted]
  )

  const memoizedSubjectField = useMemo(
    () => (
      <SubjectField
        composeValue={composedEmail?.subject}
        updateComposeEmail={updateComposeEmail}
        loadState={loadState}
      />
    ),
    [composedEmail, loadState]
  )

  const memoizedBodyField = useMemo(
    () => (
      <BodyField
        composeValue={composedEmail?.body}
        updateComposeEmail={updateComposeEmail}
        loadState={loadState}
      />
    ),
    [composedEmail, loadState]
  )

  const memoizedAttachmentField = useMemo(
    () => (
      <Attachments
        messageId={composedEmail?.id}
        composeValue={composedEmail?.files}
        updateComposeEmail={updateComposeEmail}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        hasInteracted={hasInteracted}
      />
    ),
    [composedEmail, loadState, hasInteracted]
  )

  const memoizedSignatureField = useMemo(
    () => (
      <SignatureEmail
        updateComposeEmail={updateComposeEmail}
        loadState={loadState}
      />
    ),
    [composedEmail, loadState]
  )

  const memoizedButtons = useMemo(
    () => (
      <S.ButtonContainer>
        <CustomButton
          type="button"
          label={local.SEND_BUTTON}
          icon={<QiSend />}
          title="Send email"
          suppressed
          onClick={(e) => handleSubmit(e)}
        />
        {(isReplying || isForwarding) && (
          <CustomButton
            label={local.CANCEL_BUTTON}
            onClick={() => handleCancelButton()}
            suppressed
            title="Cancel"
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
    ),
    [isReplying, isForwarding, draftDetails]
  )

  useMultiKeyPress(handleSubmit, actionKeys, inSearch || Boolean(activeModal))

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
            <form autoComplete="off">
              <div style={{ marginBottom: `7px` }}>
                <GS.Base>
                  <S.Row>
                    {memoizedToField}
                    <S.CcBccContainer>
                      {!showCC && (
                        <CustomButton
                          label={local.CC_LABEL}
                          onClick={() => setShowCC(true)}
                          title="Show CC recipients"
                        />
                      )}
                      {!showBCC && (
                        <CustomButton
                          label={local.BCC_LABEL}
                          onClick={() => setShowBCC(true)}
                          title="Show BCC recipients"
                        />
                      )}
                    </S.CcBccContainer>
                  </S.Row>
                  {showCC && <S.Row>{memoizedCCField}</S.Row>}
                  {showBCC && <S.Row>{memoizedBCCField}</S.Row>}
                  <S.Row>{memoizedSubjectField}</S.Row>
                  <S.Row>{memoizedBodyField}</S.Row>
                  <S.Row>{memoizedSignatureField}</S.Row>
                </GS.Base>
              </div>
              {memoizedButtons}
            </form>
            {memoizedAttachmentField}
          </GS.Base>
        </S.ComposerContainer>
      </S.Wrapper>
    </>
  )
}

export default ComposeEmail
