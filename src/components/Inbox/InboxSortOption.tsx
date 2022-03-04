import { useEffect, useMemo } from 'react'
import * as global from '../../constants/globalConstants'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import startSort from '../../utils/startSort'
import { selectEmailList, setCoreStatus } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import labelURL from '../../utils/createLabelURL'
import { setSessionViewIndex } from '../../Store/emailDetailSlice'
import getEmailListIndex from '../../utils/getEmailListIndex'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'

const INBOX_BUTTON = 'Sort inbox'

const SortInbox = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()

  const emailListIndex = useMemo(
    () => getEmailListIndex({ emailList, labelIds }),
    [emailList, labelIds]
  )

  const activateSortMode = () => {
    const staticLabelURL = labelURL(labelIds)
    if (staticLabelURL) {
      startSort({
        dispatch,
        labelURL: staticLabelURL,
        emailList,
        emailListIndex,
      })
      dispatch(setCoreStatus(global.CORE_STATUS_SORTING))
      dispatch(setSessionViewIndex(0))
    }
  }

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      keysPressed.includes(global.KEY_OSLEFT) &&
      keysPressed.includes(global.KEY_E)
    ) {
      activateSortMode()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed])

  return (
    <CustomAttentionButton
      onClick={activateSortMode}
      disabled={
        isLoading ||
        emailListIndex < 0 ||
        emailList[emailListIndex].threads.length === 0
      }
      label={INBOX_BUTTON}
      variant="secondary"
    />
  )
}

export default SortInbox
