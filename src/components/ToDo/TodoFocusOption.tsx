import { useCallback } from 'react'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../store/labelsSlice'
import {
  selectActiveModal,
  selectInSearch,
  selectIsLoading,
} from '../../store/utilsSlice'
import * as local from '../../constants/todoConstants'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import startSort from '../../utils/startSort'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
} from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import labelURL from '../../utils/createLabelURL'
import {
  setCoreStatus,
  setSessionViewIndex,
} from '../../store/emailDetailSlice'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { setModifierKey } from '../../utils/setModifierKey'
import { QiJump } from '../../images/svgIcons/quillIcons'

const actionKeys = [setModifierKey, keyConstants.KEY_LETTERS.e]

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
        selectedEmails.length > 0 ? (
          <>
            {local.BUTTON_FOCUS}
            <span> ({selectedEmails.length})</span>
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
