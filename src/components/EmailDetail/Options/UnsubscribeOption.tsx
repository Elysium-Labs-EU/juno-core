import { useCallback } from 'react'

import * as keyConstants from '../../../constants/keyConstants'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { QiMailUnsub } from '../../../images/svgIcons/quillIcons'
import { useAppSelector } from '../../../store/hooks'
import { selectInSearch } from '../../../store/utilsSlice'
import createComposeViaURL from '../../../utils/createComposeViaURL'
import { setModifierKey } from '../../../utils/setModifierKey'
import CustomButton from '../../Elements/Buttons/CustomButton'

import type { AppDispatch } from '../../../store/store'

const handleUnsubscribe = (unsubscribeLink: string, dispatch: AppDispatch) => {
  if (unsubscribeLink.includes('mailto:')) {
    createComposeViaURL({ dispatch, mailToLink: unsubscribeLink })
  } else {
    window.open(unsubscribeLink)
  }
}

const actionKeys = [setModifierKey, keyConstants.KEY_SHIFT, keyConstants.KEY_U]
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

  const handleEvent = useCallback(() => {
    handleUnsubscribe(unsubscribeLink, dispatch)
  }, [unsubscribeLink])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

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
