import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import type { ReactNode } from 'react'

import * as S from 'components/Compose/ComposeStyles'
import * as local from 'constants/composeEmailConstants'
import type { TContact } from 'store/storeTypes/contactsTypes'

interface RecipientFieldProps {
  children: ReactNode
  dataCy?: string
  error: boolean
  fieldId: string
  fieldLabel: string
  recipientFieldValue: Array<TContact>
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
  recipientFieldValue,
  children,
}: RecipientFieldProps) => (
  <>
    <S.Label
      hasValue={
        Object.keys(recipientFieldValue).length > 0
      }
      data-cy={dataCy}
    >
      <label htmlFor={fieldId}>{fieldLabel}</label>
    </S.Label>
    <FormControl error={error} fullWidth>
      {children}
      {error && (
        <FormHelperText id="component-helper-text">
          {local.EMAIL_WARNING}
        </FormHelperText>
      )}
    </FormControl>
  </>
)

export default RecipientField
