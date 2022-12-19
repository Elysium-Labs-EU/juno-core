import CustomAttentionButton from 'components/Elements/Buttons/CustomAttentionButton'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import * as local from 'constants/todoConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiJump } from 'images/svgIcons/quillIcons'
import { setCoreStatus, setSessionViewIndex } from 'store/emailDetailSlice'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  selectSelectedEmails,
} from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import type { AppDispatch } from 'store/store'
import type {
  IEmailListObject,
  ISelectedEmail,
} from 'store/storeTypes/emailListTypes'
import {
  selectActiveModal,
  selectInSearch,
  selectIsLoading,
} from 'store/utilsSlice'
import labelURL from 'utils/createLabelURL'
import { findLabelByName } from 'utils/findLabel'
import { setModifierKey } from 'utils/setModifierKey'
import startSort from 'utils/startSort'

export const activateTodo = ({
  activeEmailListIndex,
  dispatch,
  emailList,
  labelIds,
  selectedEmails,
}: {
  activeEmailListIndex: number
  dispatch: AppDispatch
  emailList: Array<IEmailListObject>
  labelIds: string[]
  selectedEmails?: ISelectedEmail
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
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  const handleEvent = () => {
    activateTodo({
      activeEmailListIndex,
      dispatch,
      emailList,
      labelIds,
      selectedEmails: selectedEmails.labelIds.includes(
        findLabelByName({
          storageLabels,
          LABEL_NAME: global.TODO_LABEL_NAME,
        })?.id ?? ''
      )
        ? selectedEmails
        : undefined,
    })
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
    emailList[activeEmailListIndex].threads.length === 0

  return (
    <CustomAttentionButton
      tabIndex={-1}
      onClick={handleEvent}
      disabled={isDisabled}
      label={
        selectedEmails.selectedIds.length > 0 &&
        selectedEmails.labelIds.includes(
          findLabelByName({
            storageLabels,
            LABEL_NAME: global.TODO_LABEL_NAME,
          })?.id ?? ''
        ) ? (
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
