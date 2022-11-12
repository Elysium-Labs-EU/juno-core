import CustomAttentionButton from 'components/Elements/Buttons/CustomAttentionButton'
import StyledCircularProgress from 'components/Elements/StyledCircularProgress'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useFetchEmailsSimple from 'hooks/useFetchEmailsSimple'
import useFetchThreadsTotalNumber from 'hooks/useFetchThreadsTotalNumber'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiSort } from 'images/svgIcons/quillIcons'
import { useCallback } from 'react'
import { setCoreStatus, setSessionViewIndex } from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
  setActiveEmailListIndex,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, setCurrentLabels } from 'store/labelsSlice'
import {
  selectActiveModal,
  selectInSearch,
  selectIsFlexibleFlowActive,
  selectIsLoading,
} from 'store/utilsSlice'
import labelURL from 'utils/createLabelURL'
import getEmailListIndex from 'utils/getEmailListIndex'
import { setModifierKey } from 'utils/setModifierKey'
import startSort from 'utils/startSort'

import InboxSortPopper from './InboxSortPopper'

const INBOX_BUTTON = 'Sort inbox'
const actionKeysStrictFlow = [setModifierKey, keyConstants.KEY_LETTERS.s]
const actionKeysFlexibleFlow = [setModifierKey, keyConstants.KEY_LETTERS.e]

const InboxSortOption = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const activeModal = useAppSelector(selectActiveModal)
  const emailList = useAppSelector(selectEmailList)
  const inSearch = useAppSelector(selectInSearch)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const dispatch = useAppDispatch()
  const { totalThreads, loadingState } = useFetchThreadsTotalNumber([
    global.INBOX_LABEL,
  ])

  // An hook to fetch the required emails for the INBOX feed
  useFetchEmailsSimple()

  const resultMap = {
    [global.LOAD_STATE_MAP.loaded]: totalThreads > 0 && `(${totalThreads})`,
    [global.LOAD_STATE_MAP.loading]: <StyledCircularProgress size={10} />,
    [global.LOAD_STATE_MAP.error]: undefined,
    [global.LOAD_STATE_MAP.idle]: undefined,
  }

  const handleEventStrictFlow = useCallback(() => {
    const staticLabelURL = labelURL([global.INBOX_LABEL])
    if (staticLabelURL) {
      // If the strict flow is active, find the index and set the labels and email list on click.
      const emailListIndex = getEmailListIndex({
        emailList,
        labelIds: [global.INBOX_LABEL],
      })
      dispatch(setActiveEmailListIndex(emailListIndex))
      dispatch(setCurrentLabels([global.INBOX_LABEL]))
      startSort({
        dispatch,
        labelURL: staticLabelURL,
        emailList,
        activeEmailListIndex: emailListIndex,
      })

      dispatch(setCoreStatus(global.CORE_STATUS_MAP.sorting))
      dispatch(setSessionViewIndex(0))
    }
  }, [dispatch, emailList])

  const handleEventFlexibleFlow = useCallback(() => {
    const staticLabelURL = labelURL([global.INBOX_LABEL])
    if (staticLabelURL) {
      startSort({
        dispatch,
        labelURL: staticLabelURL,
        emailList,
        selectedEmails,
        activeEmailListIndex,
      })

      dispatch(setCoreStatus(global.CORE_STATUS_MAP.sorting))
      dispatch(setSessionViewIndex(0))
    }
  }, [activeEmailListIndex, selectedEmails, dispatch, emailList, labelIds])

  useKeyboardShortcut({
    actionKeys: isFlexibleFlowActive
      ? actionKeysFlexibleFlow
      : actionKeysStrictFlow,
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
        activeEmailListIndex < 0 ||
        emailList[activeEmailListIndex].threads.length === 0
      )
    }
    return isLoading || totalThreads === 0
  }

  const selectLabel = useCallback(() => {
    if (isFlexibleFlowActive) {
      if (
        selectedEmails.selectedIds.length > 0 &&
        selectedEmails.labelIds.includes(global.INBOX_LABEL)
      ) {
        return (
          <>
            {INBOX_BUTTON}
            <span> ({selectedEmails.selectedIds.length})</span>
          </>
        )
      }
      return INBOX_BUTTON
    }
    return (
      <>
        {INBOX_BUTTON}{' '}
        <span style={{ color: `var(--color-neutral-500)`, fontWeight: '200' }}>
          {resultMap[loadingState]}
        </span>
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
      />
      {!isFlexibleFlowActive && <InboxSortPopper />}
    </>
  )
}

export default InboxSortOption
