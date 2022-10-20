import { useCallback } from 'react'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as keyConstants from '../../../constants/keyConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { navigateNextMail, selectInSearch } from '../../../store/utilsSlice'
import { QiSkip } from '../../../images/svgIcons/quillIcons'

const actionKeys = [keyConstants.KEY_SPECIAL.shift, keyConstants.KEY_LETTERS.k]

const SkipOption = ({ iconSize }: { iconSize: number }) => {
  const dispatch = useAppDispatch()
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    dispatch(navigateNextMail())
  }, [dispatch])
  useMultiKeyPress(handleEvent, actionKeys, inSearch)

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
