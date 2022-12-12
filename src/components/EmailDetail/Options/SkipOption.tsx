import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import * as local from 'constants/emailDetailConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { QiSkip } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { navigateNextMail, selectInSearch } from 'store/utilsSlice'

const actionKeys = [keyConstants.KEY_SPECIAL.shift, keyConstants.KEY_LETTERS.k]

const SkipOption = ({ iconSize }: { iconSize: number }) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    dispatch(navigateNextMail())
  }, [dispatch])
  useKeyboardShortcut({ handleEvent, actionKeys, isDisabled: inSearch })

  return (
    <CustomButton
      icon={<QiSkip size={iconSize} />}
      label={local.BUTTON_SKIP}
      onClick={handleEvent}
      suppressed
      title="Skip email"
    />
  )
}

export default SkipOption
