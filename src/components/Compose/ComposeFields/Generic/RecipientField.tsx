import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import * as S from '../../ComposeStyles'
import * as local from '../../../../constants/composeEmailConstants'
import EmailInput from './EmailInput/EmailInput'
import type { IContact } from '../../../../store/storeTypes/contactsTypes'
import type { IRecipientsList } from '../../ComposeEmailTypes'

interface IRecipientField {
  recipientFieldValue: IContact[]
  fieldId: string
  fieldLabel: string
  error: boolean
  handleChangeRecipients: (recipientListRaw: IRecipientsList) => void
  inputValue: string
  setInputValue: (value: string) => void
  handleDelete: (value: any) => void
  showField: boolean
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
