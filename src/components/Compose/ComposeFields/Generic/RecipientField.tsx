import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import type { Dispatch, SetStateAction } from 'react'

import type { IRecipientsList } from 'components/Compose/ComposeEmailTypes'
import * as S from 'components/Compose/ComposeStyles'
import * as local from 'constants/composeEmailConstants'
import type { IContact } from 'store/storeTypes/contactsTypes'

import EmailInput from './EmailInput/EmailInput'

interface IRecipientField {
  recipientFieldValue: Array<IContact>
  fieldId: string
  fieldLabel: string
  error: boolean
  handleChangeRecipients: (recipientListRaw: IRecipientsList) => void
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
  handleDelete: (value: any) => void
  showField: boolean
  registerOnKeyDown: () => void
}

/**
 * @component RecipientField
 * @param {object}
 * @returns a template component for the recipient of the email
 */

const RecipientField = ({
  recipientFieldValue,
  fieldId,
  fieldLabel,
  error,
  handleChangeRecipients,
  inputValue,
  setInputValue,
  handleDelete,
  showField,
  registerOnKeyDown,
}: IRecipientField) => (
  <>
    <S.Label
      hasValue={
        recipientFieldValue && Object.keys(recipientFieldValue).length > 0
      }
    >
      <label htmlFor={fieldId}>{fieldLabel}</label>
    </S.Label>
    <FormControl error={error} fullWidth>
      <EmailInput
        id={fieldId}
        valueState={recipientFieldValue}
        handleChange={handleChangeRecipients}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleDelete={handleDelete}
        registerOnKeyDown={registerOnKeyDown}
        willAutoFocus={
          showField &&
          recipientFieldValue &&
          Object.keys(recipientFieldValue).length > 0
        }
      />
      {error && (
        <FormHelperText id="component-helper-text">
          {local.EMAIL_WARNING}
        </FormHelperText>
      )}
    </FormControl>
  </>
)

export default RecipientField
