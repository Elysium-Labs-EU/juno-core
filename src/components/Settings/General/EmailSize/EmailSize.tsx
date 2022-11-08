import { fetchSizeKeyMap } from '../../../../constants/baseConstants'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectEmailListSize,
  selectSettingsLabelId,
  setEmailFetchSize,
} from '../../../../store/utilsSlice'
import updateSettingsLabel from '../../../../utils/settings/updateSettingsLabel'
import StyledSelect from '../../../Elements/Select/StyledSelect'

const selectOptions = {
  id: 'emailSize',
  label: 'Emails fetched at a time',
  options: [{ value: '20' }, { value: '25' }, { value: '30' }, { value: '35' }],
}

const EmailSize = () => {
  const fetchCount = useAppSelector(selectEmailListSize)
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const dispatch = useAppDispatch()

  const handleEmailListSizeChange = (selectedValue: string) => {
    updateSettingsLabel({
      settingsLabelId,
      fetchSize: fetchSizeKeyMap[parseInt(selectedValue, 10)],
    })
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
