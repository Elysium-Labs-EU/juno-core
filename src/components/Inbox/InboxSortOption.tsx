import { useCallback, useEffect } from 'react'

import { CircularProgress } from '@mui/material'

import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import useFetchThreadsTotalNumber from '../../hooks/useFetchThreadsTotalNumber'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { Sort } from '../../images/svgIcons/quillIcons'
import {
  setCoreStatus,
  setSessionViewIndex,
} from '../../store/emailDetailSlice'
import {
  fetchEmailsSimple,
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectLabelIds,
  selectLoadedInbox,
  setCurrentLabels,
} from '../../store/labelsSlice'
import {
  selectActiveModal,
  selectInSearch,
  selectIsFlexibleFlowActive,
  selectIsLoading,
} from '../../store/utilsSlice'
import labelURL from '../../utils/createLabelURL'
import getEmailListIndex from '../../utils/getEmailListIndex'
import { setModifierKey } from '../../utils/setModifierKey'
import startSort from '../../utils/startSort'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'

import { INBOX_LABEL } from './InboxIndicator/InboxIndicatorBar'

const INBOX_BUTTON = 'Sort inbox'
const actionKeys = [setModifierKey, keyConstants.KEY_E]

// TODO: Refactor to have simpler code

const InboxSortOption = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const activeModal = useAppSelector(selectActiveModal)
  const inSearch = useAppSelector(selectInSearch)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const dispatch = useAppDispatch()
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)

  const { totalThreads, loadingState } = useFetchThreadsTotalNumber(INBOX_LABEL)

  const resultMap = {
    [global.LOAD_STATE_MAP.loaded]: `(${totalThreads})`,
    [global.LOAD_STATE_MAP.loading]: <CircularProgress size={10} />,
    [global.LOAD_STATE_MAP.idle]: <CircularProgress size={10} />,
  }

  useEffect(() => {
    let mounted = true
    if (loadedInbox.flat(1).indexOf(INBOX_LABEL[0]) === -1) {
      const params = {
        labelIds: INBOX_LABEL,
        maxResults: 10,
        nextPageToken: null,
      }

      if (mounted) {
        dispatch(fetchEmailsSimple(params))
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  const handleEvent = useCallback(() => {
    const staticLabelURL = labelURL(INBOX_LABEL)
    if (staticLabelURL) {
      // If the strict flow is active, find the index and set the labels and email list on click.
      if (!isFlexibleFlowActive) {
        const emailListIndex = getEmailListIndex({
          emailList,
          labelIds: INBOX_LABEL,
        })
        dispatch(setActiveEmailListIndex(emailListIndex))
        dispatch(setCurrentLabels(INBOX_LABEL))
        startSort({
          dispatch,
          labelURL: staticLabelURL,
          emailList,
          activeEmailListIndex: emailListIndex,
        })
      } else {
        startSort({
          dispatch,
          labelURL: staticLabelURL,
          emailList,
          activeEmailListIndex,
        })
      }
      dispatch(setCoreStatus(global.CORE_STATUS_SORTING))
      dispatch(setSessionViewIndex(0))
    }
  }, [
    activeEmailListIndex,
    dispatch,
    emailList,
    labelIds,
    isFlexibleFlowActive,
  ])

  useMultiKeyPress(handleEvent, actionKeys, inSearch || Boolean(activeModal))

  // TODO: activeEmailListIndex is not always the inbox, in case of an empty todo list and the user has the strict flow enabled.
  const isDisabled =
    isLoading ||
    activeEmailListIndex < 0 ||
    emailList[activeEmailListIndex].threads.length === 0

  return (
    <CustomAttentionButton
      onClick={handleEvent}
      disabled={isDisabled}
      label={
        isFlexibleFlowActive ? (
          INBOX_BUTTON
        ) : (
          <>
            {INBOX_BUTTON} {resultMap[loadingState]}
          </>
        )
      }
      variant="secondary"
      title={!isDisabled ? 'Start sorting inbox' : 'There is nothing to sort'}
      icon={<Sort color="var(--color-black)" size={20} />}
    />
  )
}

export default InboxSortOption
