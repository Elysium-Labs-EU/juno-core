import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import type { MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import Seo from 'components/Elements/Seo'
import type { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as local from 'constants/composeEmailConstants'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiEscape, QiSend } from 'images/svgIcons/quillIcons'
import {
  createUpdateDraft,
  fetchDrafts,
  selectDraftList,
  sendComposedEmail,
} from 'store/draftsSlice'
import {
  selectIsForwarding,
  selectIsReplying,
  setIsForwarding,
  setIsReplying,
} from 'store/emailDetailSlice'
import { refreshEmailFeed } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { IComposeEmailReceive } from 'store/storeTypes/composeTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'
import type { TGmailV1SchemaDraftSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import { selectActiveModal, selectInSearch } from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import findDraftMessageInList from 'utils/findDraftMessageInList'
import isEqual from 'utils/isEqual/isEqual'
import { setModifierKey } from 'utils/setModifierKey'

import type { IRecipientsList } from './ComposeEmailTypes'
import Attachments from './ComposeFields/Attachments/Attachments'
import BodyField from './ComposeFields/BodyField/BodyField'
import ContactField from './ComposeFields/ContactField'
import SignatureEmail from './ComposeFields/Signature/SignatureEmail'
import SubjectField from './ComposeFields/SubjectField'
import * as S from './ComposeStyles'
import DiscardDraftButton from './DiscardDraftButton'
import useParsePresetValues from './Hooks/useParsePresetValues'

export const recipientListTransform = (recipientListRaw: IRecipientsList) => ({
  fieldId: recipientListRaw.fieldId,
  newValue: recipientListRaw.newValue.map((item: string | TContact) =>
    typeof item === 'string' ? { name: item, emailAddress: item } : item
  ),
})

const isTContactArray = (value: any): value is TContact[] =>
  Array.isArray(value) && value.every((item) => 'emailAddress' in item)

const isFileArray = (value: any): value is File[] =>
  Array.isArray(value) && value.every((item) => item instanceof File)

const isIEmailAttachmentTypeArray = (
  value: any
): value is IEmailAttachmentType[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      'body' in item &&
      'filename' in item &&
      'headers' in item &&
      'mimeType' in item &&
      'partId' in item
  )

// Props are coming from ReplyComposer or ForwardComposer
interface IComposeEmailProps {
  presetValue?: IComposeEmailReceive
  messageOverviewListener?: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
}

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
  const [localDraftDetails, setLocalDraftDetails] = useState<
    TGmailV1SchemaDraftSchema | undefined
  >(undefined)
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [hasInteracted, setHasInteracted] = useState(false)
  const userInteractedRef = useRef(false)
  const snapshotComposeEmailRef = useRef<any>(null)

  const [composedEmail, updateComposedEmail] = useReducer(
    (
      state: { [key: string]: string | TContact[] | File[] } | null,
      action: { id: string; value: string | TContact[] | null | File[] }
    ) => {
      if (Array.isArray(action)) {
        let updatedState = state
        action.forEach((item) => {
          if ('id' in item && 'value' in item) {
            const { id, value } = item
            updatedState = {
              ...updatedState,
              [id]: value,
            }
          }
        })
        return updatedState
      }
      if ('id' in action && 'value' in action && action.value !== null) {
        const { id, value } = action
        return {
          ...state,
          [id]: value,
        }
      }
      return state
    },
    null
  )

  // Use this hook to parse possible preset values at component mount
  useParsePresetValues({
    setShowCC,
    setShowBCC,
    setComposedEmail: updateComposedEmail,
    setLoadState,
    loadState,
    presetValueObject: presetValue || (location.state as IComposeEmailReceive),
  })

  // A function to change the userInteractedRef to true - this should only occur when the user has interacted with the opened draft.
  // The flag is used to allow the system to update the draft.
  useEffect(() => {
    if (!userInteractedRef.current && hasInteracted) {
      userInteractedRef.current = true
    }
  }, [hasInteracted])

  // Listen to any changes of the composeEmail object to update the draft
  useEffect(() => {
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
        const response: TGmailV1SchemaDraftSchema = await dispatch(
          createUpdateDraft({ composedEmail, localDraftDetails })
        )
        if (response) {
          setLocalDraftDetails(response)
        }
      }
      asyncDispatchAction()
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
    (e?: MouseEvent<HTMLButtonElement>) => {
      if (e) {
        e.preventDefault()
      }
      if (composedEmail) {
        dispatch(sendComposedEmail({ composedEmail, localDraftDetails }))
      }
    },
    [composedEmail, localDraftDetails]
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
        composeValue={
          isTContactArray(composedEmail?.to) ? composedEmail?.to : undefined
        }
        dataCy="to-field"
        hasInteracted={hasInteracted}
        id={local.TO}
        label={local.TO_LABEL}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        showField={!isReplying}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [isReplying, composedEmail, loadState, hasInteracted]
  )

  const memoizedCCField = useMemo(
    () => (
      <ContactField
        composeValue={
          isTContactArray(composedEmail?.cc) ? composedEmail?.cc : undefined
        }
        dataCy="cc-field"
        hasInteracted={hasInteracted}
        id={local.CC}
        label={local.CC_LABEL}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        showField={showCC}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [showCC, composedEmail, loadState, hasInteracted]
  )

  const memoizedBCCField = useMemo(
    () => (
      <ContactField
        composeValue={
          isTContactArray(composedEmail?.bcc) ? composedEmail?.bcc : undefined
        }
        dataCy="bcc-field"
        hasInteracted={hasInteracted}
        id={local.BCC}
        label={local.BCC_LABEL}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        showField={showBCC}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [showBCC, composedEmail, loadState, hasInteracted]
  )

  const memoizedSubjectField = useMemo(
    () => (
      <SubjectField
        composeValue={
          typeof composedEmail?.subject === 'string'
            ? composedEmail?.subject
            : undefined
        }
        hasInteracted={hasInteracted}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [composedEmail, loadState, hasInteracted]
  )

  const memoizedBodyField = useMemo(
    () => (
      <BodyField
        composeValue={
          typeof composedEmail?.body === 'string'
            ? composedEmail?.body
            : undefined
        }
        hasInteracted={hasInteracted}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [composedEmail, loadState, hasInteracted]
  )

  const memoizedAttachmentField = useMemo(
    () => (
      <Attachments
        composeValue={
          isFileArray(composedEmail?.files) ||
          isIEmailAttachmentTypeArray(composedEmail?.files)
            ? composedEmail?.files
            : undefined
        }
        hasInteracted={hasInteracted}
        loadState={loadState}
        messageId={
          typeof composedEmail?.id === 'string' ? composedEmail?.id : ''
        }
        setHasInteracted={setHasInteracted}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [composedEmail, loadState, hasInteracted]
  )

  const memoizedSignatureField = useMemo(
    () => (
      <SignatureEmail
        updateComposeEmail={updateComposedEmail}
        loadState={loadState}
      />
    ),
    [composedEmail, loadState]
  )

  const memoizedButtons = useMemo(
    () => (
      <S.ButtonContainer>
        {localDraftDetails?.id &&
          localDraftDetails?.message?.threadId &&
          localDraftDetails?.message?.id && (
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
        />
      </S.ButtonContainer>
    ),
    [isReplying, isForwarding, localDraftDetails, composedEmail]
  )

  useKeyboardShortcut({
    handleEvent: handleSubmit,
    modifierKey: setModifierKey,
    key: keyConstants.KEY_SPECIAL.enter,
    isDisabled: inSearch || Boolean(activeModal),
  })

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
                    <GS.Span small muted>
                      {local.DRAFT_SAVED}
                    </GS.Span>
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
