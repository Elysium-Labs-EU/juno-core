import { useCallback } from 'react'
import toast from 'react-hot-toast'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiMailUnsub } from 'images/svgIcons/quillIcons'
import { selectCoreStatus, setCoreStatus } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import type { AppDispatch } from 'store/store'
import { selectInSearch } from 'store/utilsSlice'
import createComposeViaURL from 'utils/createComposeViaURL'
import handleOpenLink from 'utils/handleOpenLink'
import { setModifierKey } from 'utils/setModifierKey'

interface IHandleUnsubscribe {
  dispatch: AppDispatch
  coreStatus: string | null
  unsubscribeLink: string
}

const handleUnsubscribe = ({
  coreStatus,
  dispatch,
  unsubscribeLink,
}: IHandleUnsubscribe) => {
  if (unsubscribeLink.includes('mailto:')) {
    if (
      coreStatus === global.CORE_STATUS_MAP.focused ||
      coreStatus === global.CORE_STATUS_MAP.sorting
    ) {
      dispatch(setCoreStatus(null))
    }
    createComposeViaURL({ dispatch, mailToLink: unsubscribeLink })
  } else {
    window.open(unsubscribeLink)
    const newWindow = window.open(unsubscribeLink)
    const messageContent = `A content blocker is preventing the page from opening. Please disable your content blocker or try via the button.`

    setTimeout(() => {
      if (newWindow?.closed || !newWindow) {
        toast.error((t) => (
          <span>
            {messageContent}
            <CustomButton
              onClick={() => {
                handleOpenLink({ action: unsubscribeLink })
                toast.dismiss(t.id)
              }}
              label="Open link"
            />
          </span>
        ))
      }
    }, 1000)
  }
}

const UNSUBSCRIBE = 'Unsubscribe'

interface IUnsubscribeOption {
  dispatch: AppDispatch
  unsubscribeLink: string
  iconSize: number
}

const UnsubscribeOption = ({
  dispatch,
  unsubscribeLink,
  iconSize,
}: IUnsubscribeOption) => {
  const inSearch = useAppSelector(selectInSearch)
  const coreStatus = useAppSelector(selectCoreStatus)

  const handleEvent = useCallback(() => {
    handleUnsubscribe({ unsubscribeLink, dispatch, coreStatus })
  }, [unsubscribeLink])

  useKeyboardShortcut({
    handleEvent,
    modifierKey: setModifierKey,
    key: keyConstants.KEY_LETTERS.u,
    isDisabled: inSearch,
  })

  return (
    <CustomButton
      icon={<QiMailUnsub size={iconSize} />}
      label={UNSUBSCRIBE}
      onClick={handleEvent}
      suppressed
      title="Unsubscribe"
      dataCy="unsubscribe-button"
    />
  )
}

export default UnsubscribeOption
