import { useCallback } from 'react'
import { push } from 'redux-first-history'
import { setModifierKey } from '../../../utils/setModifierKey'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as keyConstants from '../../../constants/keyConstants'
import { useAppSelector} from '../../../store/hooks'
import { selectInSearch } from '../../../store/utilsSlice'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import { QiMailUnsub } from '../../../images/svgIcons/quillIcons'
import type { AppDispatch } from '../../../store/store'
import RoutesConstants from '../../../constants/routes.json'


const createCompose = ({
  dispatch,
  link,
}: {
  dispatch: AppDispatch
  link: string
}): void => {
  dispatch(
    push(`${RoutesConstants.COMPOSE_EMAIL}?${link.replace(':', '=')}`)
  )
}

const handleUnsubscribe = (link: string,dispatch: AppDispatch) => {
  if (link.includes('mailto:')) {
    createCompose({ dispatch, link })
  }
  else{
  window.open(link)
  }
}

const actionKeys = [setModifierKey, keyConstants.KEY_SHIFT, keyConstants.KEY_U]
const UNSUBSCRIBE = 'Unsubscribe'

const UnsubscribeOption = ({
  dispatch,
  unsubscribeLink,
  iconSize,
}: {
  dispatch: AppDispatch,
  unsubscribeLink: string
  iconSize: number
}) => {
  const inSearch = useAppSelector(selectInSearch)

  const handleEvent = useCallback(() => {
    handleUnsubscribe(unsubscribeLink,dispatch)
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
