import { useMemo } from 'react'
import * as global from '../../constants/globalConstants'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import startSort from '../../utils/startSort'
import { selectEmailList, setCoreStatus } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import labelURL from '../../utils/createLabelURL'
import { setSessionViewIndex } from '../../Store/emailDetailSlice'

const INBOX_BUTTON = 'Sort inbox'

const SortInbox = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()

  const emailListIndex = useMemo(
    () =>
      emailList.findIndex(
        (threadList) =>
          threadList.labels && threadList.labels.includes(labelIds[0])
      ),
    [emailList, labelIds]
  )

  const handleClick = () => {
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

  return (
    <CustomAttentionButton
      onClick={handleClick}
      disabled={isLoading}
      label={INBOX_BUTTON}
    />
  )
}

export default SortInbox
