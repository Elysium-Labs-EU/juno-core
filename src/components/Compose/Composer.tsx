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
import Stack from 'components/Elements/Stack/Stack'
import type { EmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
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
import type { ComposeEmailReceive } from 'store/storeTypes/composeTypes'
import type { TContact } from 'store/storeTypes/contactsTypes'
import type { TEmailDetailState } from 'store/storeTypes/emailDetailTypes'
import type { TGmailV1SchemaDraftSchema } from 'store/storeTypes/gmailBaseTypes/gmailTypes'
import { selectActiveModal, selectInSearch } from 'store/utilsSlice'
import { Base, Span } from 'styles/globalStyles'
import findDraftMessageInList from 'utils/findDraftMessageInList'
import isEqual from 'utils/isEqual/isEqual'
import { setModifierKey } from 'utils/setModifierKey'

import Attachments from './ComposeFields/Attachments/Attachments'
import BodyField from './ComposeFields/BodyField/BodyField'
import ContactField from './ComposeFields/ContactField'
import SignatureEmail from './ComposeFields/Signature/SignatureEmail'
import SubjectField from './ComposeFields/SubjectField'
import * as S from './ComposeStyles'
import DiscardDraftButton from './DiscardDraftButton'
import useParsePresetValues from './Hooks/useParsePresetValues'

const isTContactArray = (value: unknown): value is TContact[] =>
  Array.isArray(value) && value.every((item) => 'emailAddress' in item)

const isFileArray = (value: unknown): value is File[] =>
  Array.isArray(value) && value.every((item) => item instanceof File)

const isEmailAttachmentTypeArray = (
  value: unknown
): value is EmailAttachmentType[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      'body' in item &&
      'filename' in item &&
      'headers' in item &&
      'mimeType' in item &&
      'partId' in item
  )

export const assertComposerMode = ({
  isForwarding,
  isReplying,
}: Pick<TEmailDetailState, 'isForwarding' | 'isReplying'>) => {
  if (isReplying) {
    return 'replying'
  }
  if (isForwarding) {
    return 'forwarding'
  }
  return 'composing'
}

// Props are coming from ReplyComposer or ForwardComposer
interface ComposeEmailProps {
  presetValue?: ComposeEmailReceive
  messageOverviewListener?: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
}

type Action = { id: string; value: string | TContact[] | null | File[] }
type Actions = Action[]


const Composer = ({
  presetValue = undefined,
  messageOverviewListener = undefined,
}: ComposeEmailProps) => {
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


  const [composedEmail, updateComposedEmail] = useReducer(
    (state: { [key: string]: string | TContact[] | File[] } | null, action: Action | Actions) => {
      if (Array.isArray(action)) {
        let updatedState = state
        action.forEach((item) => {
          if (typeof item === 'object' && item.value !== null) {
            const { id, value } = item
            updatedState = {
              ...updatedState,
              [id]: value,
            }
          }
        })
        return updatedState
      }
      if (action.value !== null) {
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

  const userInteractedRef = useRef(false)
  const snapshotComposeEmailRef = useRef<typeof composedEmail>(null)

  // Use this hook to parse possible preset values at component mount
  useParsePresetValues({
    setShowCC,
    setShowBCC,
    setComposedEmail: updateComposedEmail,
    setLoadState,
    loadState,
    presetValueObject: presetValue || (location.state as ComposeEmailReceive),
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
    if (!composedEmail) {
      return
    }
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
      userInteractedRef.current &&
      !isEqual(snapshotComposeEmailRef.current, composedEmail)
    ) {
      snapshotComposeEmailRef.current = composedEmail
      // If the user is interacting with the draft, send an update request and set the response as the local state
      const asyncDispatchAction = async () => {
        const response = await dispatch(
          createUpdateDraft({ composedEmail, localDraftDetails })
        )
        if (response) {
          setLocalDraftDetails(response)
        }
      }
      void asyncDispatchAction()
    }
  }, [composedEmail, localDraftDetails])

  // Based on the changes in the draftDetails, notify the user that the save was successful
  useEffect(() => {
    if (localDraftDetails && userInteractedRef.current) {
      setSaveSuccess(true)
      const timer = setTimeout(() => {
        setSaveSuccess(false)
      }, 2500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [localDraftDetails])

  const handleSubmit = useCallback(
    (e?: MouseEvent<HTMLButtonElement>) => {
      if (!composedEmail) {
        return
      }
      if (e) {
        e.preventDefault()
      }
      dispatch(sendComposedEmail({ composedEmail, localDraftDetails }))
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
    void dispatch(fetchDrafts())
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
            ? composedEmail.subject
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
        autofocus={isReplying ? 'start' : false}
        composeValue={
          typeof composedEmail?.body === 'string'
            ? composedEmail.body
            : undefined
        }
        composerMode={assertComposerMode({ isForwarding, isReplying })}
        hasInteracted={hasInteracted}
        loadState={loadState}
        setHasInteracted={setHasInteracted}
        updateComposeEmail={updateComposedEmail}
      />
    ),
    [composedEmail, hasInteracted, isForwarding, isReplying, loadState]
  )

  const memoizedAttachmentField = useMemo(
    () => (
      <Attachments
        composeValue={
          isFileArray(composedEmail?.files) ||
            isEmailAttachmentTypeArray(composedEmail?.files)
            ? composedEmail?.files
            : undefined
        }
        hasInteracted={hasInteracted}
        loadState={loadState}
        messageId={
          typeof composedEmail?.id === 'string' ? composedEmail.id : ''
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
          localDraftDetails.message?.threadId &&
          localDraftDetails.message.id && (
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
        {/* // TODO add disabled state, email should at least have a recipient, adjust the suppressed state after there is a recipient, subject, and body */}
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
    <S.Wrapper tabbedView={(isReplying || isForwarding)}>
      <S.ComposerContainer tabbedView={(isReplying || isForwarding)}>
        <Base>
          <form autoComplete="off">
            <S.TopRowControls>
              <S.UpdateContainer>
                {saveSuccess && (
                  <Span small muted>
                    {local.DRAFT_SAVED}
                  </Span>
                )}
              </S.UpdateContainer>
              {memoizedButtons}
            </S.TopRowControls>
            <Stack direction="vertical">
              <S.Row>
                {memoizedToField}
                <S.CcBccContainer>
                  {!showCC ? (
                    <CustomButton
                      label={local.CC_LABEL}
                      onClick={() => setShowCC(true)}
                      suppressed
                      title="Show CC recipients"
                    />
                  ) : null}
                  {!showBCC ? (
                    <CustomButton
                      label={local.BCC_LABEL}
                      onClick={() => setShowBCC(true)}
                      suppressed
                      title="Show BCC recipients"
                    />
                  ) : null}
                </S.CcBccContainer>
              </S.Row>
              {showCC ? <S.Row>{memoizedCCField}</S.Row> : null}
              {showBCC ? <S.Row>{memoizedBCCField}</S.Row> : null}
              <S.Row>{memoizedSubjectField}</S.Row>
              <S.Row>{memoizedBodyField}</S.Row>
              <S.Row>{memoizedSignatureField}</S.Row>
            </Stack>
          </form>
          {memoizedAttachmentField}
        </Base>
      </S.ComposerContainer>
    </S.Wrapper>
  )
}

export default Composer
