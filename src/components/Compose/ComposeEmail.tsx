import isEqual from 'lodash/isEqual'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as React from 'react'
import { useLocation } from 'react-router-dom'

import * as local from '../../constants/composeEmailConstants'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { QiEscape, QiSend } from '../../images/svgIcons/quillIcons'
import {
  createUpdateDraft,
  fetchDrafts,
  selectDraftList,
  sendComposedEmail,
} from '../../store/draftsSlice'
import {
  selectIsForwarding,
  selectIsReplying,
  setIsForwarding,
  setIsReplying,
} from '../../store/emailDetailSlice'
import { refreshEmailFeed } from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  IComposeEmailReceive,
  IComposePayload,
} from '../../store/storeTypes/composeTypes'
import { IContact } from '../../store/storeTypes/contactsTypes'
import { IDraftDetailObject } from '../../store/storeTypes/draftsTypes'
import { selectActiveModal, selectInSearch } from '../../store/utilsSlice'
import * as GS from '../../styles/globalStyles'
import { setModifierKey } from '../../utils/setModifierKey'
import CustomButton from '../Elements/Buttons/CustomButton'
import Seo from '../Elements/Seo'
import { IRecipientsList } from './ComposeEmailTypes'
import Attachments from './ComposeFields/Attachments/Attachments'
import BodyField from './ComposeFields/BodyField/BodyField'
import ContactField from './ComposeFields/ContactField'
import SignatureEmail from './ComposeFields/Signature/SignatureEmail'
import SubjectField from './ComposeFields/SubjectField'
import * as S from './ComposeStyles'
import DiscardDraftButton from './DiscardDraftButton'
import useParsePresetValues from './Hooks/useParsePresetValues'
import findDraftMessageInList from '../../utils/findDraftMessageInList'

export const recipientListTransform = (recipientListRaw: IRecipientsList) => ({
  fieldId: recipientListRaw.fieldId,
  newValue: recipientListRaw.newValue.map((item: string | IContact) =>
    typeof item === 'string' ? { name: item, emailAddress: item } : item
  ),
})

// Props are coming from ReplyComposer or ForwardComposer
interface IComposeEmailProps {
  presetValue?: IComposeEmailReceive
  messageOverviewListener?: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
}

const actionKeys = [setModifierKey, keyConstants.KEY_ENTER]

const ComposeEmail = ({
  presetValue = undefined,
  messageOverviewListener = undefined,
}: IComposeEmailProps) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const draftList = useAppSelector(selectDraftList)
  const [showCC, setShowCC] = useState<boolean>(false)
  const [showBCC, setShowBCC] = useState<boolean>(false)
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  const keysPressed = useMultiKeyPress()
  const [composedEmail, setComposedEmail] = useState<
    undefined | IComposePayload
  >(undefined)
  const [localDraftDetails, setLocalDraftDetails] = useState<
    IDraftDetailObject | undefined
  >(undefined)
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [hasInteracted, setHasInteracted] = useState(false)
  const userInteractedRef = useRef(false)
  const snapshotComposeEmailRef = useRef<any>(null)

  // Use this hook to parse possible preset values at component mount
  useParsePresetValues({
    setShowCC,
    setShowBCC,
    setComposedEmail,
    setLoadState,
    loadState,
    presetValueObject: presetValue || (location.state as IComposeEmailReceive),
  })

  const updateComposeEmail = useCallback(
    (action: { id: string; value: string | IContact[] | null | File[] }) => {
      if ('id' in action && 'value' in action) {
        const { id, value } = action
        setComposedEmail({
          ...composedEmail,
          [id]: value,
        })
      }
    },
    [composedEmail]
  )

  // A function to change the userInteractedRef to true - this should only occur when the user has interacted with the opened draft.
  // The flag is used to allow the system to update the draft.
  useEffect(() => {
    if (
      !userInteractedRef.current &&
      (keysPressed.length > 0 || hasInteracted)
    ) {
      userInteractedRef.current = true
    }
  }, [keysPressed, hasInteracted])

  // Listen to any changes of the composeEmail object to update the draft
  useEffect(() => {
    let mounted = true
    const storedDraftDetails = findDraftMessageInList({
      draftList,
      target: composedEmail,
    })
    // For the first time running
    if (
      storedDraftDetails &&
      !isEqual(localDraftDetails, storedDraftDetails) &&
      !snapshotComposeEmailRef.current
    ) {
      // Attempt to use the fetched draft object it from the draftList Redux store.
      // If possible set a snapshot of the compose email
      setLocalDraftDetails(storedDraftDetails)
      snapshotComposeEmailRef.current = composedEmail
    } else if (
      composedEmail &&
      userInteractedRef.current &&
      !isEqual(snapshotComposeEmailRef.current, composedEmail)
    ) {
      snapshotComposeEmailRef.current = composedEmail
      // If the user is interacting with the draft, send an update request and set the response as the local state
      const asyncDispatchAction = async () => {
        const response: IDraftDetailObject = await dispatch(
          createUpdateDraft({ composedEmail, localDraftDetails })
        )
        if (response && mounted) {
          setLocalDraftDetails(response)
        }
      }
      asyncDispatchAction()
    }
    return () => {
      mounted = false
    }
  }, [composedEmail, localDraftDetails])

  // Based on the changes in the draftDetails, notify the user that the save was successful
  useEffect(() => {
    let mounted = true
    if (localDraftDetails && mounted && userInteractedRef.current) {
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
  }, [localDraftDetails])

  const handleSubmit = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (e) {
        e.preventDefault()
      }
      if (localDraftDetails && composedEmail) {
        dispatch(sendComposedEmail({ composedEmail, localDraftDetails }))
      }
    },
    [composedEmail]
  )

  // Return all the values to base, and refetch the email states
  const handleCancelButton = useCallback(() => {
    if (messageOverviewListener) {
      messageOverviewListener('cancel')
    }
    if (isReplying) {
      dispatch(setIsReplying(false))
    }
    if (isForwarding) {
      dispatch(setIsForwarding(false))
    }
    dispatch(refreshEmailFeed())
    dispatch(fetchDrafts())
    // On the emailDetail a refresh for EmailDetail is dispatched if this composer was opened in a reply or forward mode.
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
    [composedEmail, loadState, hasInteracted, updateComposeEmail]
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
        {localDraftDetails?.id && (
          <DiscardDraftButton
            draftId={localDraftDetails.id}
            threadId={localDraftDetails.message.threadId}
            id={localDraftDetails.message.id}
            messageOverviewListener={messageOverviewListener}
          />
        )}
        {(isReplying || isForwarding) && (
          <CustomButton
            label={local.CANCEL_BUTTON}
            onClick={() => handleCancelButton()}
            suppressed
            title="Cancel"
            icon={<QiEscape />}
          />
        )}
        <CustomButton
          type="button"
          label={local.SEND_BUTTON}
          icon={<QiSend />}
          title="Send email"
          suppressed
          onClick={(e) => handleSubmit(e)}
          disabled={!localDraftDetails}
        />
      </S.ButtonContainer>
    ),
    [isReplying, isForwarding, localDraftDetails, composedEmail]
  )

  useMultiKeyPress(handleSubmit, actionKeys, inSearch || Boolean(activeModal))

  return (
    <>
      <Seo title={local.COMPOSE} />
      <S.Wrapper tabbedView={(isReplying || isForwarding) ?? false}>
        <S.ComposerContainer tabbedView={(isReplying || isForwarding) ?? false}>
          <GS.Base>
            <form autoComplete="off">
              <S.TopRowControls>
                <S.UpdateContainer>
                  {saveSuccess && (
                    <GS.TextMutedSpan>{local.DRAFT_SAVED}</GS.TextMutedSpan>
                  )}
                </S.UpdateContainer>
                {memoizedButtons}
              </S.TopRowControls>
              <div style={{ marginBottom: `20px` }}>
                <GS.Base>
                  <S.Row>
                    {memoizedToField}
                    <S.CcBccContainer>
                      {!showCC && (
                        <CustomButton
                          label={local.CC_LABEL}
                          onClick={() => setShowCC(true)}
                          title="Show CC recipients"
                          suppressed
                        />
                      )}
                      {!showBCC && (
                        <CustomButton
                          label={local.BCC_LABEL}
                          onClick={() => setShowBCC(true)}
                          title="Show BCC recipients"
                          suppressed
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
            </form>
            {memoizedAttachmentField}
          </GS.Base>
        </S.ComposerContainer>
      </S.Wrapper>
    </>
  )
}

export default ComposeEmail
