import { useCallback } from 'react'

import CustomAttentionButton from 'components/Elements/Buttons/CustomAttentionButton'
import { INBOX_LABEL, LOAD_STATE_MAP } from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useFetchEmailsSimple from 'hooks/useFetchEmailsSimple'
import useFetchThreadsTotalNumber from 'hooks/useFetchThreadsTotalNumber'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiSort } from 'images/svgIcons/quillIcons'
import { activateInboxSort } from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
  setActiveEmailListIndex,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { setCurrentLabels } from 'store/labelsSlice'
import {
  selectActiveModal,
  selectInSearch,
  selectIsFlexibleFlowActive,
  selectIsLoading,
} from 'store/utilsSlice'
import { Span } from 'styles/globalStyles'
import getEmailListIndex from 'utils/getEmailListIndex/getEmailListIndex'
import { setModifierKey } from 'utils/setModifierKey'

import InboxRefresh from './InboxRefreshOption'

const INBOX_BUTTON = 'Sort inbox'

const InboxSortOption = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const activeModal = useAppSelector(selectActiveModal)
  const emailList = useAppSelector(selectEmailList)
  const inSearch = useAppSelector(selectInSearch)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const isLoading = useAppSelector(selectIsLoading)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const dispatch = useAppDispatch()
  const { totalThreads, loadingState } = useFetchThreadsTotalNumber([
    INBOX_LABEL,
  ])

  // An hook to fetch the required emails for the INBOX feed
  useFetchEmailsSimple()

  const resultMap = {
    [LOAD_STATE_MAP.loaded]: totalThreads > 0 && `(${totalThreads})`,
    [LOAD_STATE_MAP.loading]: totalThreads > 0 && `(${totalThreads})`,
    [LOAD_STATE_MAP.error]: undefined,
    [LOAD_STATE_MAP.idle]: undefined,
  }

  const handleEventStrictFlow = useCallback(() => {
    const emailListIndex = getEmailListIndex({
      emailList,
      labelIds: [INBOX_LABEL],
    })
    void dispatch(
      activateInboxSort({
        alternateEmailListIndex: emailListIndex,
        onActivateAdditionalFns: () => {
          dispatch(setActiveEmailListIndex(emailListIndex))
          dispatch(setCurrentLabels([INBOX_LABEL]))
        },
      })
    )
  }, [dispatch, emailList])

  const handleEventFlexibleFlow = useCallback(() => {
    void dispatch(activateInboxSort({}))
  }, [dispatch])

  useKeyboardShortcut({
    key: isFlexibleFlowActive
      ? keyConstants.KEY_LETTERS.e
      : keyConstants.KEY_LETTERS.s,
    modifierKey: setModifierKey,
    handleEvent: isFlexibleFlowActive
      ? handleEventFlexibleFlow
      : handleEventStrictFlow,
    isDisabled: inSearch || Boolean(activeModal),
    refreshOnDeps: [emailList, activeEmailListIndex, selectedEmails],
  })

  const isDisabled = () => {
    if (isFlexibleFlowActive) {
      return (
        isLoading ||
        activeEmailListIndex === -1 ||
        totalThreads === 0
      )
    }
    return isLoading || totalThreads === 0
  }

  const selectLabel = useCallback(() => {
    if (isFlexibleFlowActive) {
      if (
        selectedEmails && selectedEmails.selectedIds.length > 0 &&
        selectedEmails.labelIds.includes(INBOX_LABEL)
      ) {
        return (
          <>
            {INBOX_BUTTON}
            <Span> ({selectedEmails.selectedIds.length})</Span>
          </>
        )
      }
      return INBOX_BUTTON
    }
    return (
      <>
        {INBOX_BUTTON}{' '}
        <Span style={{ color: `var(--color-neutral-500)`, fontWeight: '200' }}>
          {resultMap[loadingState]}
        </Span>
      </>
    )
  }, [isFlexibleFlowActive, loadingState, selectedEmails])

  return (
    <>
      <CustomAttentionButton
        onClick={
          isFlexibleFlowActive ? handleEventFlexibleFlow : handleEventStrictFlow
        }
        tabIndex={isFlexibleFlowActive ? -1 : 0}
        disabled={isDisabled()}
        label={selectLabel()}
        variant="secondary"
        title={
          !isDisabled() ? 'Start sorting inbox' : 'There is nothing to sort'
        }
        icon={<QiSort color="var(--color-black)" size={20} />}
        dataCy="inbox-sort-button"
      />
      {!isFlexibleFlowActive && <InboxRefresh />}
    </>
  )
}

export default InboxSortOption
