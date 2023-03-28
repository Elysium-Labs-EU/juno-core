import toast from 'react-hot-toast'

import StyledSelect from 'components/Elements/Select/StyledSelect'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import type { TUserSettings } from 'store/storeTypes/gmailBaseTypes/otherTypes'
import { selectEmailListSize, setEmailFetchSize } from 'store/utilsSlice'

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

const EmailSize = () => {
  const fetchCount = useAppSelector(selectEmailListSize)
  const dispatch = useAppDispatch()

  const handleEmailListSizeChange = (
    selectedValue: (typeof selectOptions)['options'][0]['value']
  ) => {
    const selectedValueToNumber = valueToNumber[selectedValue]
    if (!selectedValueToNumber) {
      toast.error('Could not update the email size.')
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
