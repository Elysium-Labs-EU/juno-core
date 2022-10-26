import { useCallback } from 'react'

import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import * as local from '../../constants/todoConstants'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { QiJump } from '../../images/svgIcons/quillIcons'
import {
  setCoreStatus,
  setSessionViewIndex,
} from '../../store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
} from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectLabelIds } from '../../store/labelsSlice'
import { AppDispatch } from '../../store/store'
import {
  IEmailListObject,
  ISelectedEmail,
} from '../../store/storeTypes/emailListTypes'
import {
  selectActiveModal,
  selectInSearch,
  selectIsLoading,
} from '../../store/utilsSlice'
import labelURL from '../../utils/createLabelURL'
import { setModifierKey } from '../../utils/setModifierKey'
import startSort from '../../utils/startSort'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'

const actionKeys = [setModifierKey, keyConstants.KEY_LETTERS.e]

export const activateTodo = ({
  activeEmailListIndex,
  dispatch,
  emailList,
  labelIds,
  selectedEmails,
}: {
  activeEmailListIndex: number
  dispatch: AppDispatch
  emailList: IEmailListObject[]
  labelIds: string[]
  selectedEmails: ISelectedEmail
}) => {
  const staticLabelURL = labelURL(labelIds)
  if (staticLabelURL) {
    startSort({
      dispatch,
      labelURL: staticLabelURL,
      emailList,
      selectedEmails,
      activeEmailListIndex,
    })
    dispatch(setCoreStatus(global.CORE_STATUS_MAP.focused))
    dispatch(setSessionViewIndex(0))
  }
}

const TodoFocusOption = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const activeModal = useAppSelector(selectActiveModal)
  const emailList = useAppSelector(selectEmailList)
  const inSearch = useAppSelector(selectInSearch)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const dispatch = useAppDispatch()

  const handleEvent = useCallback(() => {
    activateTodo({
      activeEmailListIndex,
      dispatch,
      emailList,
      labelIds,
      selectedEmails,
    })
  }, [activeEmailListIndex, dispatch, emailList, labelIds, selectedEmails])

  useMultiKeyPress({
    handleEvent,
    actionKeys,
    disabled: inSearch || Boolean(activeModal),
  })

  const isDisabled =
    isLoading ||
    activeEmailListIndex < 0 ||
    emailList[activeEmailListIndex].threads.length === 0

  return (
    <CustomAttentionButton
      onClick={handleEvent}
      disabled={isDisabled}
      label={
        selectedEmails.selectedIds.length > 0 ? (
          <>
            {local.BUTTON_FOCUS}
            <span> ({selectedEmails.selectedIds.length})</span>
          </>
        ) : (
          local.BUTTON_FOCUS
        )
      }
      title={
        !isDisabled ? 'Start focus mode' : 'First add items to the to do list'
      }
      icon={
        <QiJump
          color={isDisabled ? 'var(--color-black)' : 'var(--color-white)'}
          size={20}
        />
      }
    />
  )
}

export default TodoFocusOption
