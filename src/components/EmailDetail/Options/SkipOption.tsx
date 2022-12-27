import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as local from 'constants/emailDetailConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiSkip } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { navigateNextMail, selectInSearch } from 'store/utilsSlice'

const SkipOption = ({ iconSize }: { iconSize: number }) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    dispatch(navigateNextMail())
  }, [dispatch])
  useKeyboardShortcut({
    handleEvent,
    key: keyConstants.KEY_LETTERS.k,
    modifierKey: keyConstants.KEY_SPECIAL.shift,
    isDisabled: inSearch,
  })

  return (
    <CustomButton
      icon={<QiSkip size={iconSize} />}
      label={local.BUTTON_SKIP}
      onClick={handleEvent}
      suppressed
      title="Skip email"
      dataCy="skip-button"
    />
  )
}

export default SkipOption
