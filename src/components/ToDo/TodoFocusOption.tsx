import CustomAttentionButton from 'components/Elements/Buttons/CustomAttentionButton'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiJump } from 'images/svgIcons/quillIcons'
import { activateTodo } from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import {
  selectActiveModal,
  selectInSearch,
  selectIsLoading,
} from 'store/utilsSlice'
import { Span } from 'styles/globalStyles'
import { findLabelByName } from 'utils/findLabel'
import { setModifierKey } from 'utils/setModifierKey'

const TodoFocusOption = () => {
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const activeModal = useAppSelector(selectActiveModal)
  const emailList = useAppSelector(selectEmailList)
  const inSearch = useAppSelector(selectInSearch)
  const isLoading = useAppSelector(selectIsLoading)
  const labelIds = useAppSelector(selectLabelIds)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  const handleEvent = () => {
    dispatch(activateTodo())
  }

  useKeyboardShortcut({
    modifierKey: setModifierKey,
    key: keyConstants.KEY_LETTERS.e,
    handleEvent,
    isDisabled: inSearch || Boolean(activeModal),
    refreshOnDeps: [labelIds],
  })

  const isDisabled =
    isLoading ||
    activeEmailListIndex < 0 ||
    emailList?.[activeEmailListIndex]?.threads.length === 0

  return (
    <CustomAttentionButton
      tabIndex={-1}
      onClick={handleEvent}
      disabled={isDisabled}
      label={
        selectedEmails && selectedEmails.selectedIds.length > 0 &&
          selectedEmails.labelIds.includes(
            findLabelByName({
              storageLabels,
              LABEL_NAME: global.TODO_LABEL_NAME,
            })?.id ?? ''
          ) ? (
          <>
            {global.BUTTON_FOCUS}
            <Span> ({selectedEmails.selectedIds.length})</Span>
          </>
        ) : (
          global.BUTTON_FOCUS
        )
      }
      title={
        !isDisabled ? 'Start focus mode' : 'First add items to the to do list'
      }
      dataCy="todo-focus-button"
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
