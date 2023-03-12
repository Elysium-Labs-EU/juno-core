import { useCallback, useEffect, useMemo, useState } from 'react'

import * as global from 'constants/globalConstants'
import type { TContact } from 'store/storeTypes/contactsTypes'
import emailValidation from 'utils/emailValidation'
import isEqual from 'utils/isEqual/isEqual'

import type { IContactField } from './ComposeFieldTypes'
import RecipientField from './Generic/RecipientField'
import type { IRecipientsList } from '../ComposeEmailTypes'

const recipientListTransform = (recipientListRaw: IRecipientsList) => ({
  fieldId: recipientListRaw.fieldId,
  newValue: recipientListRaw.newValue.map((item: string | TContact) =>
    typeof item === 'string' ? { name: item, emailAddress: item } : item
  ),
})

const ContactField = ({
  composeValue = undefined,
  dataCy = undefined,
  hasInteracted,
  id,
  label,
  loadState,
  setHasInteracted,
  showField,
  updateComposeEmail,
}: IContactField) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [value, setValue] = useState<Array<TContact>>([])
  const [error, setError] = useState<boolean>(false)

  // Listens to the parent component changes, and updates the internal state in case there is preloaded data.
  useEffect(() => {
    if (
      loadState === global.LOAD_STATE_MAP.loaded &&
      composeValue &&
      !isEqual(composeValue, value)
    ) {
      setValue(composeValue)
    }
  }, [composeValue, loadState])

  const handleDelete = useCallback(
    (selectedOption: TContact) => {
      const filteredValue = value.filter((item) => item !== selectedOption)
      setValue(filteredValue)
      const updateEventObject = {
        id,
        value: filteredValue,
      }
      updateComposeEmail(updateEventObject)
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [id, value, hasInteracted, composeValue, updateComposeEmail]
  )

  const handleChange = useCallback(
    (recipientListRaw: IRecipientsList) => {
      const recipientList = recipientListTransform(recipientListRaw)
      const validation = emailValidation(recipientList.newValue)
      if (validation) {
        setValue(recipientList.newValue)
        error && setError(false)
        const updateEventObject = {
          id,
          value: recipientList.newValue,
        }
        updateComposeEmail(updateEventObject)
      }
      if (!validation) {
        setError(true)
      }
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [error, composeValue, id, hasInteracted, updateComposeEmail]
  )

  const registerOnKeyDown = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }, [hasInteracted, setHasInteracted])

  const memoizedField = useMemo(
    () => (
      <RecipientField
        dataCy={dataCy}
        error={error}
        fieldId={id}
        fieldLabel={label}
        handleChangeRecipients={handleChange}
        handleDelete={handleDelete}
        inputValue={inputValue}
        recipientFieldValue={value}
        registerOnKeyDown={registerOnKeyDown}
        setInputValue={setInputValue}
        showField={showField}
      />
    ),
    [dataCy, error, handleChange, id, inputValue, label, value]
  )

  return memoizedField
}

export default ContactField
