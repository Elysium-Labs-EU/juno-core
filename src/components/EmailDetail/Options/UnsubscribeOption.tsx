import { useCallback } from 'react'
import { setModifierKey } from '../../../utils/setModifierKey'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as keyConstants from '../../../constants/keyConstants'
import { useAppSelector } from '../../../store/hooks'
import { selectInSearch } from '../../../store/utilsSlice'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { QiMailUnsub } from '../../../images/svgIcons/quillIcons'

const handleUnsubscribe = (link: string) => {
  window.open(link)
}

const actionKeys = [setModifierKey, keyConstants.KEY_SHIFT, keyConstants.KEY_U]
const UNSUBSCRIBE = 'Unsubscribe'

const UnsubscribeOption = ({
  unsubscribeLink,
  iconSize,
}: {
  unsubscribeLink: string
  iconSize: number
}) => {
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    handleUnsubscribe(unsubscribeLink)
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
