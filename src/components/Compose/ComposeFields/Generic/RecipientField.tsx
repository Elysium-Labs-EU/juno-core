import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import type { Dispatch, SetStateAction } from 'react'

import type { IRecipientsList } from 'components/Compose/ComposeEmailTypes'
import * as S from 'components/Compose/ComposeStyles'
import * as local from 'constants/composeEmailConstants'
import type { TContact } from 'store/storeTypes/contactsTypes'

import EmailInput from './EmailInput/EmailInput'

interface IRecipientField {
  dataCy?: string
  error: boolean
  fieldId: string
  fieldLabel: string
  handleChangeRecipients: (recipientListRaw: IRecipientsList) => void
  handleDelete: (value: any) => void
  inputValue: string
  recipientFieldValue: Array<TContact>
  registerOnKeyDown: () => void
  setInputValue: Dispatch<SetStateAction<string>>
  showField: boolean
}

/**
 * @component RecipientField
 * @param {object}
 * @returns a template component for the recipient of the email
 */

const RecipientField = ({
  dataCy = undefined,
  error,
  fieldId,
  fieldLabel,
  handleChangeRecipients,
  handleDelete,
  inputValue,
  recipientFieldValue,
  registerOnKeyDown,
  setInputValue,
  showField,
}: IRecipientField) => (
  <>
    <S.Label
      hasValue={
        recipientFieldValue && Object.keys(recipientFieldValue).length > 0
      }
      data-cy={dataCy}
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
