import StyledSelect from 'components/Elements/Select/StyledSelect'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import type { TUserSettings } from 'store/storeTypes/gmailBaseTypes/otherTypes'
import type { ISystemStatusUpdate } from 'store/storeTypes/utilsTypes'
import {
  selectEmailListSize,
  setEmailFetchSize,
  setSystemStatusUpdate,
} from 'store/utilsSlice'

export const selectOptions = {
  id: 'emailSize',
  label: 'Emails fetched at a time',
  options: [{ value: '20' }, { value: '25' }, { value: '30' }],
}

const valueToNumber: Record<string, TUserSettings['emailFetchSize']> = {
  '20': 20,
  '25': 25,
  '30': 30,
}

const errorMessage: ISystemStatusUpdate = {
  type: 'error',
  message: 'Could not update the email size.',
}

const EmailSize = () => {
  const fetchCount = useAppSelector(selectEmailListSize)
  const dispatch = useAppDispatch()

  const handleEmailListSizeChange = (
    selectedValue: (typeof selectOptions)['options'][0]['value']
  ) => {
    const selectedValueToNumber = valueToNumber[selectedValue]
    if (!selectedValueToNumber) {
      dispatch(setSystemStatusUpdate(errorMessage))
      return
    }
    dispatch(
      updateSettingsLabel({
        key: 'emailFetchSize',
        value: selectedValueToNumber,
      })
    )
    dispatch(setEmailFetchSize(selectedValueToNumber))
  }

  return (
    <StyledSelect
      ariaLabelTrigger="Email fetch size"
      label={selectOptions.label}
      onValueChange={handleEmailListSizeChange}
      selectOptions={selectOptions}
      value={fetchCount.toString()}
    />
  )
}

export default EmailSize
