import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiMailUnsub } from 'images/svgIcons/quillIcons'
import { useCallback } from 'react'
import { selectCoreStatus, setCoreStatus } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import { selectInSearch } from 'store/utilsSlice'
import createComposeViaURL from 'utils/createComposeViaURL'
import { setModifierKey } from 'utils/setModifierKey'

import type { AppDispatch } from 'store/store'

const handleUnsubscribe = ({
  coreStatus,
  dispatch,
  unsubscribeLink,
}: {
  dispatch: AppDispatch
  coreStatus: string | null
  unsubscribeLink: string
}) => {
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
  }
}

const actionKeys = [
  setModifierKey,
  keyConstants.KEY_SPECIAL.shift,
  keyConstants.KEY_LETTERS.u,
]
const UNSUBSCRIBE = 'Unsubscribe'

const UnsubscribeOption = ({
  dispatch,
  unsubscribeLink,
  iconSize,
}: {
  dispatch: AppDispatch
  unsubscribeLink: string
  iconSize: number
}) => {
  const inSearch = useAppSelector(selectInSearch)
  const coreStatus = useAppSelector(selectCoreStatus)

  const handleEvent = useCallback(() => {
    handleUnsubscribe({ unsubscribeLink, dispatch, coreStatus })
  }, [unsubscribeLink])

  useKeyboardShortcut({
    handleEvent,
    actionKeys,
    isDisabled: inSearch,
  })

  return (
    <CustomButton
      icon={<QiMailUnsub size={iconSize} />}
      label={UNSUBSCRIBE}
      onClick={handleEvent}
      suppressed
      title="Unsubscribe"
    />
  )
}

export default UnsubscribeOption
