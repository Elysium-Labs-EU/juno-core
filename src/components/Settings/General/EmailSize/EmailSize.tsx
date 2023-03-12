import StyledSelect from 'components/Elements/Select/StyledSelect'
import { emailFetchSizeKeyMap } from 'constants/baseConstants'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import {
  selectEmailListSize,
  selectSettingsLabelId,
  setEmailFetchSize,
} from 'store/utilsSlice'

export const selectOptions = {
  id: 'emailSize',
  label: 'Emails fetched at a time',
  options: [{ value: '20' }, { value: '25' }, { value: '30' }, { value: '35' }],
}

const EmailSize = () => {
  const fetchCount = useAppSelector(selectEmailListSize)
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const dispatch = useAppDispatch()

  const handleEmailListSizeChange = (selectedValue: string) => {
    dispatch(
      updateSettingsLabel({
        settingsLabelId,
        emailFetchSize: emailFetchSizeKeyMap[parseInt(selectedValue, 10)],
      })
    )
    dispatch(setEmailFetchSize(parseInt(selectedValue, 10)))
  }

  return (
    <StyledSelect
      ariaLabelTrigger="Email fetch size"
      selectOptions={selectOptions}
      onValueChange={handleEmailListSizeChange}
      value={fetchCount.toString()}
      label={selectOptions.label}
    />
  )
}

export default EmailSize
