import { useMemo } from 'react'
import { FiSkipForward } from 'react-icons/fi'
import navigateNextMail from '../../../utils/navigateNextEmail'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import {
  selectViewIndex,
  setSessionViewIndex,
} from '../../../Store/emailDetailSlice'
import { selectLabelIds } from '../../../Store/labelsSlice'
import getEmailListIndex from '../../../utils/getEmailListIndex'
import { selectEmailList } from '../../../Store/emailListSlice'

const SkipOption = () => {
  const dispatch = useAppDispatch()
  const viewIndex = useAppSelector(selectViewIndex)
  const labelIds = useAppSelector(selectLabelIds)
  const emailList = useAppSelector(selectEmailList)
  const sessionViewIndex = useAppSelector(selectViewIndex)
  const emailListIndex = useMemo(
    () => getEmailListIndex({ emailList, labelIds }),
    [emailList, labelIds]
  )

  const clickHandeler = () => {
    dispatch(setSessionViewIndex(sessionViewIndex + 1))
    navigateNextMail({
      dispatch,
      viewIndex,
      labelIds,
      activeEmailList: emailList[emailListIndex],
    })
  }

  return (
    <CustomButton
      icon={<FiSkipForward />}
      label={local.BUTTON_SKIP}
      onClick={() => clickHandeler()}
      suppressed
    />
  )
}

export default SkipOption
